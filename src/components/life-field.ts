/**
 * Life field — the hero's background texture.
 *
 * The eggzec mark hides a Conway glider and a "byte" of magenta data cells in
 * the egg, so the hero runs the actual automaton behind the wordmark: a coarse
 * toroidal Game of Life grid, drawn as rounded pixels. Newly born cells flash
 * magenta and decay to kiwi, which makes the propagation legible instead of
 * just busy.
 *
 * Cheap by construction: one Uint8Array per buffer, an integer neighbour count,
 * a fixed ~9fps simulation tick decoupled from the paint loop, and no work at
 * all while off-screen or when the tab is hidden.
 */

import { prefersReducedMotion } from '../lib/env'

/** Still lifes and oscillators the field seeds itself with. */
const PATTERNS: Record<string, Array<[number, number]>> = {
  glider: [
    [1, 0],
    [2, 1],
    [0, 2],
    [1, 2],
    [2, 2],
  ],
  lwss: [
    [0, 0],
    [3, 0],
    [4, 1],
    [0, 2],
    [4, 2],
    [1, 3],
    [2, 3],
    [3, 3],
    [4, 3],
  ],
  pulsarSeed: [
    [0, 0],
    [1, 0],
    [2, 0],
    [0, 1],
    [1, 2],
  ],
  rPentomino: [
    [1, 0],
    [2, 0],
    [0, 1],
    [1, 1],
    [1, 2],
  ],
}

export interface LifeFieldOptions {
  /** Nominal cell size in CSS px. */
  cell?: number
  /** Simulation steps per second. */
  tps?: number
  /** Fraction of cells seeded live in the initial soup. */
  density?: number
  /** Peak opacity of a settled live cell. */
  intensity?: number
  /** Reseed automatically once the population stops changing. */
  autoReseed?: boolean
  /** Let the pointer paint live cells. */
  interactive?: boolean
}

interface Palette {
  live: string
  born: string
}

export class LifeField {
  readonly #canvas: HTMLCanvasElement
  readonly #ctx: CanvasRenderingContext2D
  readonly #opts: Required<LifeFieldOptions>

  #cols = 0
  #rows = 0
  #cellPx = 16
  #dpr = 1

  /** Current generation. 1 = live. */
  #grid = new Uint8Array(0)
  #next = new Uint8Array(0)
  /** Per-cell age in generations; 0 = dead, 1 = just born. */
  #age = new Uint8Array(0)
  /** Render alpha, eased toward the target each frame so births/deaths fade. */
  #alpha = new Float32Array(0)

  #palette: Palette = { live: '#ccff00', born: '#f900ff' }

  #raf = 0
  #lastTick = 0
  #running = false
  #visible = true
  #stableFor = 0
  #generation = 0

  #pointer: { x: number; y: number; active: boolean } = { x: -1, y: -1, active: false }

  #resizeObserver: ResizeObserver | null = null
  readonly #onVisibility = () => {
    this.#visible = !document.hidden
    if (this.#visible && this.#running) this.#lastTick = performance.now()
  }

  constructor(canvas: HTMLCanvasElement, options: LifeFieldOptions = {}) {
    this.#canvas = canvas
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) throw new Error('LifeField: 2D canvas context unavailable')
    this.#ctx = ctx

    this.#opts = {
      cell: options.cell ?? 16,
      tps: options.tps ?? 9,
      density: options.density ?? 0.12,
      intensity: options.intensity ?? 0.5,
      autoReseed: options.autoReseed ?? true,
      interactive: options.interactive ?? true,
    }
  }

  /**
   * Read the field colours from the stylesheet rather than hard-coding them —
   * on a white ground kiwi vanishes, so the tokens resolve to violet/magenta.
   */
  syncPalette(): void {
    const cs = getComputedStyle(document.documentElement)
    const live = cs.getPropertyValue('--field-live').trim() || '#5200ff'
    const born = cs.getPropertyValue('--field-born').trim() || '#f900ff'
    this.#palette = { live, born }
  }

  start(): void {
    if (this.#running) return
    this.#running = true

    this.syncPalette()
    this.#resize()
    this.seed()

    this.#resizeObserver = new ResizeObserver(() => this.#resize())
    this.#resizeObserver.observe(this.#canvas.parentElement ?? this.#canvas)
    document.addEventListener('visibilitychange', this.#onVisibility)

    if (this.#opts.interactive) {
      this.#canvas.addEventListener('pointermove', this.#onPointerMove, { passive: true })
      this.#canvas.addEventListener('pointerleave', this.#onPointerLeave, { passive: true })
    }

    // Reduced motion still gets the texture, just frozen after a few steps.
    if (prefersReducedMotion()) {
      for (let i = 0; i < 4; i++) this.#step()
      this.#settleAlpha()
      this.#paint()
      return
    }

    this.#lastTick = performance.now()
    this.#raf = requestAnimationFrame(this.#frame)
  }

  stop(): void {
    this.#running = false
    cancelAnimationFrame(this.#raf)
    this.#resizeObserver?.disconnect()
    this.#resizeObserver = null
    document.removeEventListener('visibilitychange', this.#onVisibility)
    this.#canvas.removeEventListener('pointermove', this.#onPointerMove)
    this.#canvas.removeEventListener('pointerleave', this.#onPointerLeave)
  }

  /** Wipe and re-seed: a soup band plus a scatter of gliders heading inward. */
  seed(): void {
    const { density } = this.#opts
    this.#grid.fill(0)
    this.#age.fill(0)
    this.#stableFor = 0
    this.#generation = 0

    for (let i = 0; i < this.#grid.length; i++) {
      if (Math.random() < density) {
        this.#grid[i] = 1
        // Seeded cells start "mature" so the first paint is kiwi, not a
        // magenta flash across the whole field.
        this.#age[i] = 2 + Math.floor(Math.random() * 6)
      }
    }

    const gliders = Math.max(3, Math.round((this.#cols * this.#rows) / 2200))
    const names = Object.keys(PATTERNS)
    for (let i = 0; i < gliders; i++) {
      const name = names[Math.floor(Math.random() * names.length)] ?? 'glider'
      this.#stamp(
        PATTERNS[name] ?? PATTERNS.glider!,
        Math.floor(Math.random() * this.#cols),
        Math.floor(Math.random() * this.#rows),
        Math.random() < 0.5,
      )
    }
  }

  #stamp(cells: Array<[number, number]>, ox: number, oy: number, flipX: boolean): void {
    for (const [dx, dy] of cells) {
      const x = (((flipX ? -dx : dx) + ox) % this.#cols + this.#cols) % this.#cols
      const y = ((dy + oy) % this.#rows + this.#rows) % this.#rows
      const i = y * this.#cols + x
      this.#grid[i] = 1
      this.#age[i] = 1
    }
  }

  #resize(): void {
    const host = this.#canvas.parentElement ?? this.#canvas
    const rect = host.getBoundingClientRect()
    const w = Math.max(1, Math.round(rect.width))
    const h = Math.max(1, Math.round(rect.height))

    this.#dpr = Math.min(window.devicePixelRatio || 1, 2)
    this.#canvas.width = Math.round(w * this.#dpr)
    this.#canvas.height = Math.round(h * this.#dpr)
    this.#canvas.style.width = `${w}px`
    this.#canvas.style.height = `${h}px`

    // Coarser cells on small screens so the automaton stays readable.
    const base = w < 640 ? this.#opts.cell * 0.75 : this.#opts.cell
    const cols = Math.max(8, Math.ceil(w / base))
    const rows = Math.max(6, Math.ceil(h / base))
    this.#cellPx = w / cols

    if (cols !== this.#cols || rows !== this.#rows) {
      this.#cols = cols
      this.#rows = rows
      const n = cols * rows
      this.#grid = new Uint8Array(n)
      this.#next = new Uint8Array(n)
      this.#age = new Uint8Array(n)
      this.#alpha = new Float32Array(n)
      this.seed()
    }

    this.#ctx.setTransform(this.#dpr, 0, 0, this.#dpr, 0, 0)
  }

  #step(): void {
    const { grid, next, age, cols, rows } = {
      grid: this.#grid,
      next: this.#next,
      age: this.#age,
      cols: this.#cols,
      rows: this.#rows,
    }

    let changed = 0

    for (let y = 0; y < rows; y++) {
      const yUp = ((y - 1 + rows) % rows) * cols
      const yMid = y * cols
      const yDn = ((y + 1) % rows) * cols

      for (let x = 0; x < cols; x++) {
        const xL = (x - 1 + cols) % cols
        const xR = (x + 1) % cols

        const n =
          grid[yUp + xL]! + grid[yUp + x]! + grid[yUp + xR]! +
          grid[yMid + xL]! + grid[yMid + xR]! +
          grid[yDn + xL]! + grid[yDn + x]! + grid[yDn + xR]!

        const i = yMid + x
        const alive = grid[i] === 1
        const born = alive ? n === 2 || n === 3 : n === 3

        next[i] = born ? 1 : 0
        if (born !== alive) changed++

        if (born) {
          age[i] = alive ? Math.min(255, age[i]! + 1) : 1
        } else {
          age[i] = 0
        }
      }
    }

    // Swap buffers rather than copying.
    const tmp = this.#grid
    this.#grid = this.#next
    this.#next = tmp

    this.#generation++
    this.#stableFor = changed < Math.max(2, (cols * rows) / 900) ? this.#stableFor + 1 : 0

    if (this.#opts.autoReseed && (this.#stableFor > 26 || this.#generation > 900)) {
      this.seed()
    }
  }

  /** Ease every cell's alpha to its target in one go (used for static renders). */
  #settleAlpha(): void {
    for (let i = 0; i < this.#grid.length; i++) {
      this.#alpha[i] = this.#grid[i] === 1 ? this.#opts.intensity : 0
    }
  }

  readonly #frame = (now: number): void => {
    if (!this.#running) return
    this.#raf = requestAnimationFrame(this.#frame)
    if (!this.#visible) return

    const interval = 1000 / this.#opts.tps
    if (now - this.#lastTick >= interval) {
      this.#lastTick = now - ((now - this.#lastTick) % interval)
      this.#step()
      if (this.#pointer.active) this.#paintPointer()
    }

    this.#paint()
  }

  #paintPointer(): void {
    const cx = Math.floor(this.#pointer.x / this.#cellPx)
    const cy = Math.floor(this.#pointer.y / this.#cellPx)
    if (cx < 0 || cy < 0 || cx >= this.#cols || cy >= this.#rows) return
    // Drop a live cell under the cursor so the field reacts without exploding.
    if (Math.random() < 0.7) {
      const i = cy * this.#cols + cx
      this.#grid[i] = 1
      this.#age[i] = 1
    }
  }

  #paint(): void {
    const ctx = this.#ctx
    const { cols, rows } = this
    const size = this.#cellPx
    const w = this.#canvas.width / this.#dpr
    const h = this.#canvas.height / this.#dpr

    ctx.clearRect(0, 0, w, h)

    const target = this.#opts.intensity
    const inset = Math.max(0.5, size * 0.14)
    const box = Math.max(1, size - inset * 2)
    const radius = Math.min(box / 2, Math.max(1, size * 0.22))

    let prevFill = ''

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const i = y * cols + x
        const want = this.#grid[i] === 1 ? target : 0
        // Births snap in fast, deaths linger — reads as a trail.
        const rate = want > this.#alpha[i]! ? 0.42 : 0.09
        const a = this.#alpha[i]! + (want - this.#alpha[i]!) * rate
        this.#alpha[i] = a
        if (a < 0.01) continue

        // Only the generation that was *just* born flashes magenta; anything
        // older settles to kiwi. Widening this washes the whole field pink.
        const young = this.#age[i] === 1
        const fill = young ? this.#palette.born : this.#palette.live
        if (fill !== prevFill) {
          ctx.fillStyle = fill
          prevFill = fill
        }
        ctx.globalAlpha = young ? Math.min(1, a * 1.5) : a

        ctx.beginPath()
        ctx.roundRect(x * size + inset, y * size + inset, box, box, radius)
        ctx.fill()
      }
    }

    ctx.globalAlpha = 1
  }

  get cols(): number {
    return this.#cols
  }

  get rows(): number {
    return this.#rows
  }

  readonly #onPointerMove = (event: PointerEvent): void => {
    const rect = this.#canvas.getBoundingClientRect()
    this.#pointer = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      active: true,
    }
  }

  readonly #onPointerLeave = (): void => {
    this.#pointer = { x: -1, y: -1, active: false }
  }
}

/** Mount a life field on every `[data-life-field]` canvas in the document. */
export function mountLifeFields(root: ParentNode = document): LifeField[] {
  const fields: LifeField[] = []

  for (const canvas of root.querySelectorAll<HTMLCanvasElement>('canvas[data-life-field]')) {
    const field = new LifeField(canvas, {
      cell: Number(canvas.dataset.cell ?? 16),
      tps: Number(canvas.dataset.tps ?? 9),
      density: Number(canvas.dataset.density ?? 0.12),
      intensity: Number(canvas.dataset.intensity ?? 0.5),
      interactive: canvas.dataset.interactive !== 'false',
    })
    field.start()
    fields.push(field)
  }

  // Keep the automaton on-brand when the theme flips.
  window.addEventListener('eggzec:themechange', () => {
    for (const field of fields) field.syncPalette()
  })

  return fields
}
