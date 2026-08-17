/**
 * Mark draw — the hero's background animation.
 *
 * astral.sh reveals its bolt behind the headline with a Lottie built out of an
 * alpha track matte: the logo is one filled shape, and what animates is a stack
 * of rounded bars whose widths grow from zero on staggered in-points, plus a
 * pair of trimmed strokes that trace toward the mark and then swell. Nothing is
 * random, it plays once, and it resolves into the logo.
 *
 * This is the same construction in eggzec's own geometry: the egg silhouette
 * from `brand/eggzec-mark.svg` acts as the clip, kiwi bars grow out from the
 * centre line to fill it, stepped violet traces run in from the edges with a
 * magenta spark where each one lands, and the nine "byte" cells punch in last.
 *
 * Everything is declarative — one SVG plus CSS keyframes, delays driven by a
 * `--i` index per element. JS only builds the markup and flips
 * `animation-play-state` when the host scrolls into view, so there is no
 * animation loop and no per-frame work at all.
 */

import { inView } from 'motion'
import { prefersReducedMotion } from '../lib/env'

/**
 * The egg silhouette, verbatim from the brand mark. Authored on a 12×12 grid
 * with quarter-turn corners; the wrapping transform is the mark's own inset.
 */
const EGG_PATH =
  'M6.5 0Q7 0 7 .5L7 .5Q7 1 7.5 1L7.5 1Q8 1 8 1.5L8 1.5Q8 2 8.5 2L8.5 2Q9 2 9 2.5L9 2.75Q9 3 9.25 3L9.25 3Q9.5 3 9.5 3.25L9.5 3.75Q9.5 4 9.75 4L9.75 4Q10 4 10 4.25L10 4.5Q10 5 10 5.5L10 5.75Q10 6 10.25 6L10.25 6Q10.5 6 10.5 6.25L10.5 6.5Q10.5 7 10.5 7.5L10.5 7.5Q10.5 8 10.5 8.5L10.5 8.75Q10.5 9 10.25 9L10.25 9Q10 9 10 9.25L10 9.75Q10 10 9.75 10L9.75 10Q9.5 10 9.5 10.25L9.5 10.5Q9.5 11 9 11L9 11Q8.5 11 8.5 11.5L8.5 11.5Q8.5 12 8 12L4 12Q3.5 12 3.5 11.5L3.5 11.5Q3.5 11 3 11L3 11Q2.5 11 2.5 10.5L2.5 10.25Q2.5 10 2.25 10L2.25 10Q2 10 2 9.75L2 9.25Q2 9 1.75 9L1.75 9Q1.5 9 1.5 8.75L1.5 8.5Q1.5 8 1.5 7.5L1.5 7.5Q1.5 7 1.5 6.5L1.5 6.25Q1.5 6 1.75 6L1.75 6Q2 6 2 5.75L2 5.5Q2 5 2 4.5L2 4.25Q2 4 2.25 4L2.25 4Q2.5 4 2.5 3.75L2.5 3.25Q2.5 3 2.75 3L2.75 3Q3 3 3 2.75L3 2.5Q3 2 3.5 2L3.5 2Q4 2 4 1.5L4 1.5Q4 1 4.5 1L4.5 1Q5 1 5 .5L5 .5Q5 0 5.5 0Z'

/** Places the 12×12 artwork inside the mark's own padding. */
const MARK_TRANSFORM = 'translate(0.6 0.6) scale(0.9)'

/** The magenta "byte" hidden in the egg, in unscaled mark coordinates. */
const BYTE_CELLS: Array<[number, number]> = [
  [4, 4],
  [5, 5],
  [3, 6],
  [4, 6],
  [5, 6],
  [2, 9],
  [5, 9],
  [6, 9],
  [8, 9],
]

/* -- bar stack ------------------------------------------------------------- */

/** Rows of bars laid over the egg, matching the mark's 12-unit grid. */
const BAR_ROWS = 12
/** Distance between bar tops, in mark units. */
const BAR_PITCH = 0.9
/** Top of the first bar — the mark's own inset. */
const BAR_TOP = 0.6
/** Drawn bar height; the remainder of the pitch is the gap it later closes. */
const BAR_HEIGHT = 0.56

/**
 * Bars arrive scattered rather than top-to-bottom — the reference staggers its
 * in-points out of order, which reads as the mark assembling instead of wiping.
 * Fixed permutation so the hero animates identically on every load.
 */
const BAR_ORDER = [6, 2, 9, 0, 4, 11, 7, 1, 8, 3, 10, 5]

/* -- traces ---------------------------------------------------------------- */

interface Trace {
  /** Axis-aligned waypoints; corners get the mark's quarter-turn radius. */
  points: Array<[number, number]>
  /** Corner radius override for tight geometry. */
  radius?: number
}

/**
 * Circuit runs that arrive from outside the frame and terminate *on* the egg's
 * outline, so the spark at the end of each one sits on the silhouette.
 */
const MARK_TRACES: Trace[] = [
  { points: [[-8, 8.6], [-4.4, 8.6], [-4.4, 5.2], [2.4, 5.2]] },
  { points: [[20, 3.4], [15.4, 3.4], [15.4, 7.2], [10.05, 7.2]] },
  { points: [[-7, 14], [-7, 11.4], [-2.6, 11.4], [-2.6, 9.4], [2.6, 9.4]] },
  { points: [[16.6, -2], [16.6, 1.6], [13.4, 1.6], [13.4, 4.2], [9.6, 4.2]] },
]

/** The standalone rule: the same circuit language stretched into a strip. */
const RULE_TRACES: Trace[] = [
  {
    points: [
      [-2, 10],
      [14, 10],
      [14, 6],
      [38, 6],
      [38, 9.5],
      [62, 9.5],
      [62, 4],
      [98, 4],
    ],
  },
  {
    points: [
      [-2, 3],
      [22, 3],
      [22, 7.5],
      [50, 7.5],
      [50, 11.5],
      [74, 11.5],
      [74, 7],
      [98, 7],
    ],
  },
]

/** Junctions on the rule that light up once the traces have passed through. */
const RULE_SPARKS: Array<[number, number]> = [
  [14, 6],
  [38, 9.5],
  [50, 7.5],
  [62, 4],
  [74, 7],
]

/**
 * Builds an axis-aligned path whose corners are quarter turns, the same way the
 * logo and the project icons are drawn — `Q` with the corner as the control
 * point. Assumes every segment is longer than twice the radius.
 */
function steppedPath(points: Array<[number, number]>, radius = 0.5): string {
  const first = points[0]
  if (!first) return ''

  let d = `M${first[0]} ${first[1]}`

  for (let i = 1; i < points.length - 1; i++) {
    const prev = points[i - 1]!
    const corner = points[i]!
    const next = points[i + 1]!

    const inX = Math.sign(corner[0] - prev[0])
    const inY = Math.sign(corner[1] - prev[1])
    const outX = Math.sign(next[0] - corner[0])
    const outY = Math.sign(next[1] - corner[1])

    const enter = [corner[0] - inX * radius, corner[1] - inY * radius]
    const leave = [corner[0] + outX * radius, corner[1] + outY * radius]

    d += `L${enter[0]} ${enter[1]}Q${corner[0]} ${corner[1]} ${leave[0]} ${leave[1]}`
  }

  const last = points[points.length - 1]!
  return `${d}L${last[0]} ${last[1]}`
}

function traceMarkup(traces: Trace[], radius: number): string {
  return traces
    .map((trace, i) => {
      const d = steppedPath(trace.points, trace.radius ?? radius)
      return `<path class="mark-draw__trace" style="--i:${i}" pathLength="1" d="${d}" />`
    })
    .join('')
}

function sparkMarkup(points: Array<[number, number]>, size: number): string {
  return points
    .map(
      ([x, y], i) =>
        `<rect class="mark-draw__spark" style="--i:${i}" x="${x - size / 2}" y="${
          y - size / 2
        }" width="${size}" height="${size}" />`,
    )
    .join('')
}

/** The egg, its bar matte, its traced outline and the byte cells. */
function markSvg(id: string, withCells: boolean): string {
  const bars = Array.from({ length: BAR_ROWS }, (_, row) => {
    const rank = BAR_ORDER.indexOf(row)
    const y = BAR_TOP + row * BAR_PITCH + (BAR_PITCH - BAR_HEIGHT) / 2
    return `<rect class="mark-draw__bar" style="--i:${rank < 0 ? row : rank}" x="0" y="${y.toFixed(
      3,
    )}" width="12" height="${BAR_HEIGHT}" rx="0.16" />`
  }).join('')

  const cells = withCells
    ? `<g class="mark-draw__cells" transform="${MARK_TRANSFORM}">${BYTE_CELLS.map(
        ([x, y], i) =>
          `<rect class="mark-draw__cell" style="--i:${i}" x="${x}" y="${y}" width="1" height="1" />`,
      ).join('')}</g>`
    : ''

  const sparks = MARK_TRACES.map((trace) => trace.points[trace.points.length - 1]!)

  return `<svg class="mark-draw__svg" viewBox="-6 -1.5 24 15" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="${id}">
          <path transform="${MARK_TRANSFORM}" d="${EGG_PATH}" />
        </clipPath>
      </defs>
      <g class="mark-draw__traces">${traceMarkup(MARK_TRACES, 0.5)}</g>
      <g class="mark-draw__fill" clip-path="url(#${id})">${bars}</g>
      <path class="mark-draw__outline" transform="${MARK_TRANSFORM}" pathLength="1" d="${EGG_PATH}" />
      <g class="mark-draw__sparks">${sparkMarkup(sparks, 0.44)}</g>
      ${cells}
    </svg>`
}

/** A strip of circuit runs, for rules and other short, wide hosts. */
function ruleSvg(): string {
  return `<svg class="mark-draw__svg mark-draw__svg--rule" viewBox="0 0 96 14" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <g class="mark-draw__traces">${traceMarkup(RULE_TRACES, 1.4)}</g>
      <g class="mark-draw__sparks">${sparkMarkup(RULE_SPARKS, 1.1)}</g>
    </svg>`
}

let instance = 0

/**
 * Mount the mark on every `[data-mark-draw]` host. `data-mark-draw="rule"`
 * swaps the egg for the strip variant; `data-cells="false"` drops the byte.
 */
export function mountMarkDraws(root: ParentNode = document): void {
  const hosts = Array.from(root.querySelectorAll<HTMLElement>('[data-mark-draw]'))
  if (hosts.length === 0) return

  const reduced = prefersReducedMotion()

  for (const host of hosts) {
    if (host.dataset.markDrawn === 'true') continue
    host.dataset.markDrawn = 'true'

    host.classList.add('mark-draw')
    host.setAttribute('aria-hidden', 'true')

    host.innerHTML =
      host.dataset.markDraw === 'rule'
        ? ruleSvg()
        : markSvg(`mark-draw-egg-${++instance}`, host.dataset.cells !== 'false')

    // Reduced motion still gets the mark, just already drawn.
    if (reduced) {
      host.classList.add('is-static')
      continue
    }

    // Plays once, like the reference: the composition resolves into the logo
    // and holds there rather than looping.
    inView(host, () => host.classList.add('is-playing'), { amount: 0.15 })
  }
}
