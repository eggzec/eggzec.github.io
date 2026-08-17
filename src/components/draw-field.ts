/**
 * Draw field — the animated plate behind the page.
 *
 * astral.sh reveals the mark behind its headline with a Lottie built from an
 * alpha track matte: one filled shape, uncovered by a stack of rounded bars
 * whose widths grow from zero on staggered in-points, with trimmed strokes
 * tracing in alongside. Nothing is random, it plays once, it resolves.
 *
 * The choreography here is that one; the subject is what eggzec actually
 * builds. The anchor is ∇ℒ, traced straight out of `brand/icons/nlpql.svg` —
 * the nabla outlined then filled through its bar matte, the script L written on
 * block by block. Around it sit the methods: a contour plot with a descent
 * stepping to the optimum, a residual curve falling to tolerance, a Wiener path
 * with pollen drifting off it, a block of binary, and the equations themselves.
 *
 * All type is the site's own eggzec Block, the bitmap face the headlines use,
 * extended here with the handful of maths glyphs the equations need. Every
 * glyph is therefore drawn on the same grid, with the same merged runs and
 * quarter-turn corners, as the nabla it sits beside.
 *
 * The build is declarative — one SVG plus CSS keyframes, delays driven by a
 * `--i` index per element. JS emits markup and flips `animation-play-state`
 * when the host scrolls in, so there is no animation loop and no per-frame
 * work. The pollen is the one thing that keeps moving afterwards, and it does
 * it on the compositor.
 */

import { inView } from 'motion'
import { GLYPHS, bitmapPath } from '../lib/eggzec-block'
import {
  NABLA_BOX,
  NABLA_COUNTER,
  NABLA_OUTLINE,
  SCRIPT_L,
  SCRIPT_L_BOX,
  SCRIPT_L_RADIUS,
} from '../lib/nlpql-glyphs'
import { prefersReducedMotion } from '../lib/env'

type Point = [number, number]

function round(n: number): number {
  return Math.round(n * 1000) / 1000
}

function polyline(points: Point[]): string {
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${round(p[0])} ${round(p[1])}`).join('')
}

/** An ellipse as a path, so `pathLength` normalisation works everywhere. */
function ellipsePath(cx: number, cy: number, rx: number, ry: number): string {
  return `M${cx - rx} ${cy}A${rx} ${ry} 0 1 0 ${cx + rx} ${cy}A${rx} ${ry} 0 1 0 ${cx - rx} ${cy}Z`
}

/**
 * Deterministic noise. The plate must be identical on every load — a hero that
 * reshuffles between refreshes reads as a bug — so the Wiener path and the
 * pollen drift come from a counter, not from `Math.random`.
 */
function noise(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

/* ========================================================================== *
 * Type — eggzec Block, extended for maths
 * ========================================================================== */

/**
 * The glyphs the equations need and the display font does not carry, authored
 * on the same 5x7 body so they set on the same baseline and advance.
 */
const MATHS: Readonly<Record<string, string>> = {
  '=': '00000/00000/11111/00000/11111/00000/00000',
  '(': '00110/01000/01000/01000/01000/01000/00110',
  ')': '01100/00010/00010/00010/00010/00010/01100',
  ',': '00000/00000/00000/00000/00000/00100/01000',
  α: '00000/00000/01110/10001/10001/10011/01101',
  '∇': '11111/10001/01010/01010/00100/00100/00000',
  Σ: '11111/10000/01000/00100/01000/10000/11111',
  '∫': '00110/01010/01000/01000/01000/01010/01100',
  '≈': '00000/01010/10101/00000/01010/10101/00000',
}

/** Grid rows in a glyph body, and the advance between glyph origins. */
const BODY_ROWS = 7
const ADVANCE = 6
/** Subscripts and superscripts, as a fraction of the base size. */
const SCRIPT_SCALE = 0.66

function glyphSpec(char: string): string | undefined {
  return MATHS[char] ?? GLYPHS[char.toUpperCase()]
}

interface Run {
  char: string
  /** 0 for the baseline run, +1 for a subscript, -1 for a superscript. */
  level: number
}

/** Splits `A_{K+1}` into runs, so scripts can be set smaller and offset. */
function parseRuns(source: string): Run[] {
  const runs: Run[] = []
  let i = 0

  while (i < source.length) {
    const ch = source[i]!
    if ((ch === '_' || ch === '^') && source[i + 1] === '{') {
      const end = source.indexOf('}', i + 2)
      if (end > 0) {
        const level = ch === '_' ? 1 : -1
        for (const c of source.slice(i + 2, end)) runs.push({ char: c, level })
        i = end + 1
        continue
      }
    }
    runs.push({ char: ch, level: 0 })
    i++
  }

  return runs
}

/**
 * Sets one line of maths in eggzec Block. Each glyph is its own `<path>` inside
 * a `<g>` that carries the placement — the animation writes `transform` on the
 * path, and a CSS transform replaces the attribute rather than composing with
 * it, so the two must never live on the same element.
 */
function blockText(
  source: string,
  x: number,
  y: number,
  size: number,
  className: string,
  indexFrom = 0,
): string {
  const unit = size / BODY_ROWS
  let cursor = x
  let index = indexFrom
  let out = ''

  for (const run of parseRuns(source)) {
    const scale = run.level === 0 ? unit : unit * SCRIPT_SCALE
    const advance = ADVANCE * scale

    if (run.char === ' ') {
      cursor += advance * 0.7
      continue
    }

    const spec = glyphSpec(run.char)
    if (!spec) {
      cursor += advance
      continue
    }

    // Scripts hang below the baseline; superscripts ride above the cap line.
    const dy = run.level === 1 ? size * 0.42 : run.level === -1 ? -size * 0.18 : 0
    const { d } = bitmapPath(spec)

    out +=
      `<g transform="translate(${round(cursor)} ${round(y + dy)}) scale(${round(scale)})">` +
      `<path class="${className}" style="--i:${index}" d="${d}" /></g>`

    cursor += advance
    index++
  }

  return out
}

/* ========================================================================== *
 * Motifs
 * ========================================================================== */

/** Bit patterns are fixed, so the plate is identical on every load. */
const BITS = ['1011010011', '0110101101', '1101001010']

function binaryBlock(
  x: number,
  y: number,
  size: number,
  pitchX: number,
  pitchY: number,
  rows: number,
  cols: number,
): string {
  const unit = size / BODY_ROWS
  let out = ''
  let index = 0

  for (let r = 0; r < rows; r++) {
    const bits = BITS[r % BITS.length]!
    for (let c = 0; c < cols; c++) {
      const { d } = bitmapPath(GLYPHS[bits[c % bits.length]!]!)
      // Every seventh cell sparks, which keeps the block from reading as an
      // even grey and echoes the byte hidden in the logo.
      const lit = index % 7 === 0 ? ' draw-field__bit--lit' : ''
      out +=
        `<g transform="translate(${round(x + c * pitchX)} ${round(y + r * pitchY)}) scale(${round(unit)})">` +
        `<path class="draw-field__bit${lit}" style="--i:${index}" d="${d}" /></g>`
      index++
    }
  }

  return out
}

/**
 * ∇ℒ, traced from the nlpql icon, fitted to `[x, y, height]` and returning the
 * pair's full advance so a scene can check it fits. The nabla is outlined and
 * then filled through a matte of bars growing off the centre line; the L is
 * written on block by block, the way the stroke would be made.
 */
function gradLagrangian(id: string, x: number, y: number, height: number): string {
  const scale = height / NABLA_BOX[3]
  const place = (bx: number, by: number): string =>
    `translate(${round(x - bx * scale)} ${round(y - by * scale)}) scale(${round(scale)})`

  const ring = `${NABLA_OUTLINE}${NABLA_COUNTER}`
  const nablaW = NABLA_BOX[2] * scale

  // Bars are laid out in the icon's own units, then ride the same transform.
  const steps = 12
  const pitch = NABLA_BOX[3] / steps
  const barHeight = pitch * 0.62
  const bars = Array.from({ length: steps }, (_, row) => {
    // Scattered in-points, so the glyph assembles rather than wipes.
    const rank = (row * 5) % steps
    const barY = round(NABLA_BOX[1] + row * pitch + (pitch - barHeight) / 2)
    return `<rect class="draw-field__bar" style="--i:${rank}" x="${NABLA_BOX[0] - 0.5}" y="${barY}" width="${NABLA_BOX[2] + 1}" height="${round(barHeight)}" rx="0.3" />`
  }).join('')

  // The L trails the nabla by a hair so the pair reads left to right.
  const lScale = (height * 0.66) / SCRIPT_L_BOX[3]
  const lx = x + nablaW * 0.96
  const ly = y + height * 0.3
  const blocks = SCRIPT_L.map(
    ([bx, by, bw, bh], i) =>
      `<rect class="draw-field__stroke" style="--i:${i}" x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="${SCRIPT_L_RADIUS}" />`,
  ).join('')

  return `<defs><clipPath id="${id}">
        <path clip-rule="evenodd" transform="${place(NABLA_BOX[0], NABLA_BOX[1])}" d="${ring}" />
      </clipPath></defs>
      <g clip-path="url(#${id})"><g transform="${place(NABLA_BOX[0], NABLA_BOX[1])}">${bars}</g></g>
      <g transform="${place(NABLA_BOX[0], NABLA_BOX[1])}"><path class="draw-field__glyph" fill-rule="evenodd" pathLength="1" d="${ring}" /></g>
      <g transform="translate(${round(lx - SCRIPT_L_BOX[0] * lScale)} ${round(ly - SCRIPT_L_BOX[1] * lScale)}) scale(${round(lScale)})">${blocks}</g>`
}

/**
 * A quadratic bowl in level sets, with the iterates of a descent stepping into
 * the optimum — the picture behind pyswarm and nlpql.
 */
function contourPlot(cx: number, cy: number, rx: number, ry: number, path: Point[]): string {
  const rings = [1, 0.76, 0.52, 0.28]
    .map(
      (k, i) =>
        `<path class="draw-field__ring" style="--i:${i}" pathLength="1" transform="rotate(-22 ${cx} ${cy})" d="${ellipsePath(cx, cy, round(rx * k), round(ry * k))}" />`,
    )
    .join('')

  const trail = `<path class="draw-field__descent" pathLength="1" d="${polyline(path)}" />`

  const nodes = path
    .map((p, i) => {
      const s = i === path.length - 1 ? 0.62 : 0.42
      return `<rect class="draw-field__iterate" style="--i:${i}" x="${round(p[0] - s / 2)}" y="${round(p[1] - s / 2)}" width="${s}" height="${s}" rx="0.08" />`
    })
    .join('')

  return rings + trail + nodes
}

/** Residual against iteration, falling to the tolerance line. */
function convergencePlot(x: number, y: number, w: number, h: number, samples: number): string {
  const axes = `<path class="draw-field__axis" pathLength="1" d="M${x} ${y}V${round(y + h)}H${round(x + w)}" />`
  const tol = `<path class="draw-field__tol" pathLength="1" d="M${x} ${round(y + h * 0.88)}H${round(x + w)}" />`

  const points: Point[] = Array.from({ length: samples }, (_, k) => [
    round(x + (w * k) / (samples - 1)),
    round(y + h * 0.06 + h * 0.82 * (1 - Math.exp(-0.46 * k))),
  ])

  const curve = `<path class="draw-field__curve" pathLength="1" d="${polyline(points)}" />`
  const marks = points
    .map(
      (p, i) =>
        `<rect class="draw-field__sample" style="--i:${i}" x="${round(p[0] - 0.19)}" y="${round(p[1] - 0.19)}" width="0.38" height="0.38" rx="0.06" />`,
    )
    .join('')

  return axes + tol + curve + marks
}

/**
 * A sample path of dX = a dt + b dW, drawn as the walk it is, with pollen
 * suspended off it. The grains never settle: each carries its own looping
 * jitter, which is the only thing on the plate still moving once it resolves.
 */
function wienerPath(
  x: number,
  y: number,
  w: number,
  h: number,
  steps: number,
  seed: number,
  grains: number,
): string {
  const points: Point[] = []
  let level = 0

  for (let k = 0; k <= steps; k++) {
    // Drift plus a bounded increment — a walk that reads as one, but stays in
    // its box rather than wandering out of the frame.
    level += (noise(seed + k) - 0.5) * 1.35
    level = Math.max(-1, Math.min(1, level * 0.94))
    points.push([round(x + (w * k) / steps), round(y + h / 2 + (level * h) / 2)])
  }

  const walk = `<path class="draw-field__walk" pathLength="1" d="${polyline(points)}" />`

  const pollen = Array.from({ length: grains }, (_, i) => {
    const at = points[Math.floor((noise(seed + 90 + i) * (points.length - 1)))] ?? points[0]!
    const size = 0.26 + noise(seed + 40 + i) * 0.2
    // Three drift tracks, so neighbouring grains never move in lockstep.
    const track = i % 3
    return `<rect class="draw-field__pollen draw-field__pollen--${track}" style="--i:${i}; --dur:${round(6 + noise(seed + 60 + i) * 5)}s" x="${round(at[0] - size / 2)}" y="${round(at[1] - size / 2 + (noise(seed + 20 + i) - 0.5) * h * 0.7)}" width="${round(size)}" height="${round(size)}" rx="${round(size / 2)}" />`
  }).join('')

  return walk + pollen
}

/* ========================================================================== *
 * Scenes
 * ========================================================================== */

const DESCENT: Point[] = [
  [1.9, 5.2],
  [4.4, 7.1],
  [3.5, 9.9],
  [6.1, 9],
  [6.5, 11.5],
  [7.3, 10.4],
]

/** The hero plate: the whole method on one sheet. */
function heroScene(id: string): string {
  return `<svg class="draw-field__svg" viewBox="0 0 32 30" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
      ${blockText('X_{K+1} = X_{K} - α∇F(X_{K})', 0.6, 0.6, 1.05, 'draw-field__eq')}
      ${contourPlot(7.3, 10.4, 6.4, 4.1, DESCENT)}
      ${blockText('MIN F', 8.8, 12.2, 0.8, 'draw-field__label')}
      ${gradLagrangian(id, 15.4, 3.4, 10.4)}
      ${convergencePlot(1.4, 17.4, 12, 6.4, 8)}
      ${blockText('K', 12.6, 24.4, 0.8, 'draw-field__label')}
      ${binaryBlock(17.6, 17.6, 1.3, 1.2, 1.9, 3, 11)}
      ${wienerPath(0.8, 24.6, 30.4, 2.6, 26, 7, 11)}
      ${blockText('DX = A(X,T)DT + B(X,T)DW', 0.6, 28.1, 1.05, 'draw-field__eq')}
    </svg>`
}

/** A panel plate: quadrature and the bowl it integrates over. */
function panelScene(id: string): string {
  return `<svg class="draw-field__svg draw-field__svg--panel" viewBox="0 0 22 16" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false" data-id="${id}">
      ${contourPlot(7.6, 7, 6.6, 4.2, DESCENT)}
      ${binaryBlock(14.6, 1, 1.05, 1, 1.6, 2, 7)}
      ${wienerPath(0.8, 11.6, 20.4, 2, 22, 3, 7)}
      ${blockText('∫_{A}^{B} F(X)DX ≈ Σ W_{I} F(X_{I})', 0.6, 14.2, 0.95, 'draw-field__eq')}
    </svg>`
}

/** The rule: a single run of binary across the strip. */
function ruleScene(): string {
  return `<svg class="draw-field__svg draw-field__svg--rule" viewBox="0 0 96 14" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      ${binaryBlock(2, 5.4, 3, 3.15, 1, 1, 29)}
    </svg>`
}

let instance = 0

/**
 * Mount on every `[data-draw-field]` host. The value picks the scene:
 * `hero` (default), `panel`, or `rule`.
 */
export function mountDrawFields(root: ParentNode = document): void {
  const hosts = Array.from(root.querySelectorAll<HTMLElement>('[data-draw-field]'))
  if (hosts.length === 0) return

  const reduced = prefersReducedMotion()

  for (const host of hosts) {
    if (host.dataset.drawn === 'true') continue
    host.dataset.drawn = 'true'

    host.classList.add('draw-field')
    host.setAttribute('aria-hidden', 'true')

    const id = `draw-field-${++instance}`
    const scene = host.dataset.drawField

    host.innerHTML =
      scene === 'rule' ? ruleScene() : scene === 'panel' ? panelScene(id) : heroScene(id)

    // Reduced motion still gets the plate, just already drawn and still.
    if (reduced) {
      host.classList.add('is-static')
      continue
    }

    // Plays once, like the reference: it resolves and holds rather than
    // looping. Only the pollen keeps going.
    inView(host, () => host.classList.add('is-playing'), { amount: 0.15 })
  }
}
