/**
 * Giant block-letter display type.
 *
 * The hero stacks lines of eggzec Block lettering and fits every line to the
 * *same* rendered width, so cap heights match exactly across lines. Because the
 * bitmap font is monospaced, that reduces to solving for tracking:
 *
 *     width = step * (n - 1) + COLS,  step = ADVANCE + tracking
 *   → tracking = (targetWidth - COLS) / (n - 1) - ADVANCE
 *
 * Selected glyphs can be knocked out of a kiwi block — the "Kiwi, inverted"
 * treatment from the identity sheet — which is what gives the hero its punch.
 */

import { animate, stagger } from 'motion'
import { ADVANCE, COLS, ROWS, letter, type Lettering } from '../lib/eggzec-block'
import { prefersReducedMotion } from '../lib/env'

const NS = 'http://www.w3.org/2000/svg'

/** Natural width, in grid units, of `text` at zero tracking. */
function naturalWidth(text: string): number {
  const n = [...text].filter((c) => c === ' ' || letter(c).glyphs.length > 0).length
  return n > 1 ? ADVANCE * (n - 1) + COLS : COLS
}

/** Tracking that makes `text` render exactly `target` grid units wide. */
function trackingFor(text: string, target: number): number {
  const n = [...text].filter((c) => c === ' ' || letter(c).glyphs.length > 0).length
  if (n < 2) return 0
  return (target - COLS) / (n - 1) - ADVANCE
}

export interface WordmarkLine {
  text: string
  /** Glyph indices (0-based, within the line) to knock out of an accent block. */
  knockout?: number[]
}

/** Build one `<svg>` per line, all sharing a common rendered width. */
export function buildDisplayLines(lines: WordmarkLine[]): SVGSVGElement[] {
  const target = Math.max(...lines.map((line) => naturalWidth(line.text)))

  return lines.map((line, lineIndex) => {
    const tracking = trackingFor(line.text, target)
    const g: Lettering = letter(line.text, tracking)

    const svg = document.createElementNS(NS, 'svg')
    svg.setAttribute('viewBox', g.viewBox)
    svg.setAttribute('role', 'img')
    svg.setAttribute('aria-label', line.text)
    svg.setAttribute('preserveAspectRatio', 'xMinYMid meet')
    svg.classList.add('display__line')
    svg.dataset.line = String(lineIndex)

    const knockout = new Set(line.knockout ?? [])

    g.glyphs.forEach((glyph, i) => {
      const knocked = knockout.has(i)

      if (knocked) {
        // Kiwi block behind the glyph, glyph punched out of it. The block hugs
        // the 5-wide glyph cell with a small bleed rather than the full advance,
        // so tracking changes never make it look loose.
        const pad = 0.34
        const block = document.createElementNS(NS, 'rect')
        block.setAttribute('x', String(glyph.x - pad))
        block.setAttribute('y', String(-pad))
        block.setAttribute('width', String(COLS + pad * 2))
        block.setAttribute('height', String(ROWS + pad * 2))
        block.setAttribute('rx', '0.45')
        block.classList.add('display__block')
        block.dataset.index = String(i)
        svg.appendChild(block)
      }

      const path = document.createElementNS(NS, 'path')
      path.setAttribute('d', glyph.d)
      path.classList.add('display__glyph')
      if (knocked) path.classList.add('display__glyph--knockout')
      path.dataset.index = String(i)
      path.dataset.glyph = glyph.char
      svg.appendChild(path)
    })

    return svg
  })
}

/**
 * Render into `[data-display]`, reading lines from `data-lines` (pipe
 * separated) and knockouts from `data-knockout` (`line:index` pairs).
 *
 *   <div data-display data-lines="SCIENTIFIC|COMPUTING" data-knockout="0:0,1:8"></div>
 */
export function mountDisplayType(root: ParentNode = document): void {
  for (const host of root.querySelectorAll<HTMLElement>('[data-display]')) {
    const texts = (host.dataset.lines ?? host.textContent ?? '').split('|').map((s) => s.trim())
    if (texts.length === 0) continue

    const knockouts = new Map<number, number[]>()
    for (const pair of (host.dataset.knockout ?? '').split(',')) {
      const [l, i] = pair.split(':').map((n) => Number.parseInt(n, 10))
      if (Number.isInteger(l) && Number.isInteger(i)) {
        knockouts.set(l!, [...(knockouts.get(l!) ?? []), i!])
      }
    }

    const svgs = buildDisplayLines(
      texts.map((text, i) => {
        const k = knockouts.get(i)
        return k ? { text, knockout: k } : { text }
      }),
    )

    host.replaceChildren(...svgs)
    host.dataset.ready = 'true'
    animateDisplay(host)
  }
}

/**
 * Glyphs wipe up into place, blocks scale out from their own centre.
 *
 * The pre-animation hidden state lives in CSS, keyed off the *absence* of
 * `data-revealed`. That way the headline is never invisible because an
 * animation failed to start — the worst case is that it simply appears.
 */
function animateDisplay(host: HTMLElement): void {
  if (prefersReducedMotion()) {
    host.dataset.revealed = 'true'
    return
  }

  const glyphs = Array.from(host.querySelectorAll<SVGElement>('.display__glyph'))
  const blocks = Array.from(host.querySelectorAll<SVGElement>('.display__block'))

  animate(
    glyphs,
    { opacity: [0, 1], transform: ['translateY(14%) scale(0.94)', 'translateY(0%) scale(1)'] },
    { duration: 0.7, delay: stagger(0.028, { startDelay: 0.08 }), ease: [0.22, 1, 0.36, 1] },
  )

  if (blocks.length > 0) {
    animate(
      blocks,
      { opacity: [0, 1], transform: ['scaleY(0.1)', 'scaleY(1)'] },
      { duration: 0.55, delay: stagger(0.05, { startDelay: 0.34 }), ease: [0.34, 1.4, 0.64, 1] },
    )
  }

  host.dataset.revealed = 'true'
}
