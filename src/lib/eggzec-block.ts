/**
 * Eggzec Block — display lettering for eggzec projects.
 *
 * TypeScript port of `assets/eggzec-block.js`, extended so each glyph can be
 * addressed individually (for staggered reveals) and so the raw lit-cell grid
 * is available (for pixel-scatter effects).
 *
 * Geometry is byte-for-byte identical to the original renderer: a 5x7 bitmap
 * per glyph, horizontal + vertical runs merged into rounded rects, plus small
 * bridge squares that weld diagonal neighbours together.
 */

export const GLYPHS: Readonly<Record<string, string>> = {
  A: '01110/10001/10001/11111/10001/10001/10001', B: '11110/10001/10001/11110/10001/10001/11110',
  C: '01110/10001/10000/10000/10000/10001/01110', D: '11110/10001/10001/10001/10001/10001/11110',
  E: '11111/10000/10000/11110/10000/10000/11111', F: '11111/10000/10000/11110/10000/10000/10000',
  G: '01110/10001/10000/10111/10001/10001/01111', H: '10001/10001/10001/11111/10001/10001/10001',
  I: '11111/00100/00100/00100/00100/00100/11111', J: '00111/00010/00010/00010/00010/10010/01100',
  K: '10001/10010/10100/11000/10100/10010/10001', L: '10000/10000/10000/10000/10000/10000/11111',
  M: '10001/11011/10101/10101/10001/10001/10001', N: '10001/11001/10101/10011/10001/10001/10001',
  O: '01110/10001/10001/10001/10001/10001/01110', P: '11110/10001/10001/11110/10000/10000/10000',
  Q: '01110/10001/10001/10001/10101/10010/01101', R: '11110/10001/10001/11110/10100/10010/10001',
  S: '01111/10000/10000/01110/00001/00001/11110', T: '11111/00100/00100/00100/00100/00100/00100',
  U: '10001/10001/10001/10001/10001/10001/01110', V: '10001/10001/10001/10001/10001/01010/00100',
  W: '10001/10001/10001/10101/10101/11011/10001', X: '10001/10001/01010/00100/01010/10001/10001',
  Y: '10001/10001/01010/00100/00100/00100/00100', Z: '11111/00001/00010/00100/01000/10000/11111',
  '0': '01110/10001/10011/10101/11001/10001/01110', '1': '00100/01100/00100/00100/00100/00100/01110',
  '2': '01110/10001/00001/00010/00100/01000/11111', '3': '11111/00010/00100/00010/00001/10001/01110',
  '4': '00010/00110/01010/10010/11111/00010/00010', '5': '11111/10000/11110/00001/00001/10001/01110',
  '6': '00110/01000/10000/11110/10001/10001/01110', '7': '11111/00001/00010/00100/01000/01000/01000',
  '8': '01110/10001/10001/01110/10001/10001/01110', '9': '01110/10001/10001/01111/00001/00010/01100',
  '-': '00000/00000/00000/11111/00000/00000/00000', '.': '00000/00000/00000/00000/00000/01100/01100',
  '_': '00000/00000/00000/00000/00000/00000/11111', '+': '00000/00100/00100/11111/00100/00100/00000',
  '/': '00001/00001/00010/00100/01000/10000/10000', ':': '00000/01100/01100/00000/01100/01100/00000',
}

/** Stroke thickness as a fraction of one grid cell. */
const T = 0.92
/** Inset that centres the stroke inside its cell. */
const OFF = (1 - T) / 2
/** Corner radius, in grid units. */
const R = 0.3
/** Default advance width per glyph, in grid units. */
export const ADVANCE = 6
export const ROWS = 7
export const COLS = 5

export interface Glyph {
  /** The rendered character (always upper case). */
  char: string
  /** SVG path data, already offset to this glyph's column in the run. */
  d: string
  /** Left edge of this glyph in grid units. */
  x: number
  /** Lit cells as `[col, row]` pairs, in glyph-local coordinates. */
  cells: Array<[number, number]>
}

export interface Lettering {
  /** Concatenated path data for the whole string. */
  d: string
  glyphs: Glyph[]
  viewBox: string
  /** Total width in grid units, including the 0.4 bleed on each side. */
  width: number
  /** Total height in grid units, including the 0.4 bleed on each side. */
  height: number
}

/** One rounded rectangle, clamped so the radius never exceeds half the box. */
function roundedRect(x: number, y: number, w: number, h: number): string {
  const r = Math.min(R, w / 2, h / 2)
  return (
    `M${x + r} ${y}H${x + w - r}Q${x + w} ${y} ${x + w} ${y + r}` +
    `V${y + h - r}Q${x + w} ${y + h} ${x + w - r} ${y + h}` +
    `H${x + r}Q${x} ${y + h} ${x} ${y + h - r}` +
    `V${y + r}Q${x} ${y} ${x + r} ${y}Z`
  )
}

function glyphPath(spec: string, dx: number): { d: string; cells: Array<[number, number]> } {
  const rows = spec.split('/')
  const cells: Array<[number, number]> = []
  let d = ''

  const on = (col: number, row: number): boolean => rows[row]?.[col] === '1'

  // Horizontal runs.
  for (let r = 0; r < ROWS; r++) {
    let start: number | null = null
    for (let c = 0; c <= COLS; c++) {
      const lit = c < COLS && on(c, r)
      if (lit) {
        if (start === null) start = c
        cells.push([c, r])
      }
      if (!lit && start !== null) {
        d += roundedRect(dx + start + OFF, r + OFF, c - start - 2 * OFF, T)
        start = null
      }
    }
  }

  // Vertical runs.
  for (let c = 0; c < COLS; c++) {
    let start: number | null = null
    for (let r = 0; r <= ROWS; r++) {
      const lit = r < ROWS && on(c, r)
      if (lit && start === null) start = r
      if (!lit && start !== null) {
        d += roundedRect(dx + c + OFF, start + OFF, T, r - start - 2 * OFF)
        start = null
      }
    }
  }

  // Bridge diagonal junctions so stairs read as continuous strokes.
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (!on(c, r)) continue
      if (on(c + 1, r + 1)) d += roundedRect(dx + c + 1 - 0.36, r + 1 - 0.36, 0.72, 0.72)
      if (on(c + 1, r - 1)) d += roundedRect(dx + c + 1 - 0.36, r - 0.36, 0.72, 0.72)
    }
  }

  return { d, cells }
}

/** Lay out a string of block lettering. `tracking` adds grid units between glyphs. */
export function letter(text: string, tracking = 0): Lettering {
  const t = String(text ?? '').toUpperCase()
  const step = ADVANCE + tracking
  const glyphs: Glyph[] = []
  let d = ''
  let n = 0

  for (const ch of t) {
    if (ch === ' ') {
      n++
      continue
    }
    const spec = GLYPHS[ch]
    if (!spec) continue
    const { d: gd, cells } = glyphPath(spec, n * step)
    glyphs.push({ char: ch, d: gd, x: n * step, cells })
    d += gd
    n++
  }

  const w = n > 0 ? n * step - (step - COLS) : 0
  return {
    d,
    glyphs,
    viewBox: `-0.4 -0.4 ${w + 0.8} ${ROWS + 0.8}`,
    width: w + 0.8,
    height: ROWS + 0.8,
  }
}

const NS = 'http://www.w3.org/2000/svg'

export interface RenderOptions {
  text: string
  color?: string
  /** Cap height in px — the 7-row body is scaled to exactly this. */
  height?: number
  tracking?: number
  /** Emit one `<path>` per glyph (with `data-glyph` / `data-index`) instead of one merged path. */
  perGlyph?: boolean
  /** Overrides the accessible name; defaults to `text`. */
  label?: string
}

/** Build an `<svg>` element of block lettering. */
export function renderLettering(options: RenderOptions): SVGSVGElement {
  const { text, color = 'currentColor', height = 48, tracking = 0, perGlyph = false } = options
  const g = letter(text, tracking)

  const svg = document.createElementNS(NS, 'svg')
  svg.setAttribute('viewBox', g.viewBox)
  svg.setAttribute('height', String(height * (g.height / ROWS)))
  svg.setAttribute('fill', color)
  svg.setAttribute('role', 'img')
  svg.setAttribute('aria-label', options.label ?? text)
  svg.style.display = 'block'
  svg.style.overflow = 'visible'

  if (perGlyph) {
    g.glyphs.forEach((glyph, i) => {
      const p = document.createElementNS(NS, 'path')
      p.setAttribute('d', glyph.d)
      p.dataset.glyph = glyph.char
      p.dataset.index = String(i)
      svg.appendChild(p)
    })
  } else {
    const p = document.createElementNS(NS, 'path')
    p.setAttribute('d', g.d)
    svg.appendChild(p)
  }

  return svg
}

/**
 * `<eggzec-text text="EGGZEC" height="72" per-glyph>` — a drop-in custom
 * element, kept for parity with the original script tag usage.
 */
export class EggzecText extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['text', 'color', 'height', 'tracking', 'per-glyph']
  }

  connectedCallback(): void {
    this.style.display = 'inline-block'
    this.#render()
  }

  attributeChangedCallback(): void {
    if (this.isConnected) this.#render()
  }

  #render(): void {
    const svg = renderLettering({
      text: this.getAttribute('text') ?? this.textContent ?? '',
      color: this.getAttribute('color') ?? 'currentColor',
      height: Number.parseFloat(this.getAttribute('height') ?? '48'),
      tracking: Number.parseFloat(this.getAttribute('tracking') ?? '0'),
      perGlyph: this.hasAttribute('per-glyph'),
    })
    this.replaceChildren(svg)
  }
}

export function defineEggzecText(): void {
  if (typeof customElements !== 'undefined' && !customElements.get('eggzec-text')) {
    customElements.define('eggzec-text', EggzecText)
  }
}
