/**
 * Pollen — grains suspended across the whole page.
 *
 * The plate in the hero already carries a few grains off its Wiener path. This
 * is the same idea at page scale: a fixed layer behind every section, holding
 * pollen in water. Each grain integrates a damped random walk, which is what
 * Brownian motion actually is — momentum plus a fresh impulse every step — so
 * the drift wanders instead of oscillating the way a looped keyframe would.
 *
 * The cursor is a disturbance in that water. Grains inside its radius are
 * pushed off it and *excite*: they brighten, swell, spin up, and switch to
 * their sharp pixel form. Excitement decays on its own, so a grain settles back
 * to a soft drifting speck a second or so after the cursor has gone.
 *
 * One canvas, one loop, one pass per frame. The loop stops when the tab is
 * hidden, and never starts at all under reduced motion — that case gets a
 * single static scatter, which keeps the texture without the movement.
 */

import { isCoarsePointer, prefersReducedMotion } from '../lib/env'

/** Grains per million device-independent pixels of viewport. */
const DENSITY = 115
const MIN_GRAINS = 40
const MAX_GRAINS = 240

/** How far the cursor reaches, in CSS pixels. */
const CURSOR_RADIUS = 140
/** Impulse the cursor imparts at point blank. */
const CURSOR_PUSH = 0.34
/** Fresh Brownian impulse per frame. */
const JITTER = 0.055
/** Velocity retained each frame — under 1, or the walk runs away. */
const DAMPING = 0.955
/** Ceiling on speed, so a fast cursor cannot fling a grain off screen. */
const MAX_SPEED = 2.6
/** Excitement lost per frame; roughly a second back to rest. */
const CALM = 0.978

type Shape = 'dot' | 'pixel' | 'cross'

interface Grain {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  /** Base opacity when at rest. */
  alpha: number
  hue: string
  shape: Shape
  angle: number
  spin: number
  /** 0 at rest, 1 just disturbed. */
  heat: number
}

export class PollenField {
  readonly #canvas: HTMLCanvasElement
  readonly #ctx: CanvasRenderingContext2D

  #grains: Grain[] = []
  #width = 0
  #height = 0
  #dpr = 1

  #raf = 0
  #running = false
  #pointer = { x: -9999, y: -9999, active: false }

  #resizeTimer = 0
  readonly #palette: string[]

  constructor(canvas: HTMLCanvasElement) {
    this.#canvas = canvas
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) throw new Error('PollenField: 2D canvas context unavailable')
    this.#ctx = ctx

    // Kiwi is a field colour, not a hairline one — it vanishes on white at this
    // size, so the grains take the three hues that hold.
    const cs = getComputedStyle(document.documentElement)
    const read = (name: string, fallback: string) =>
      cs.getPropertyValue(name).trim() || fallback
    this.#palette = [
      read('--violet', '#5200ff'),
      read('--violet', '#5200ff'),
      read('--magenta', '#f900ff'),
      read('--orange', '#ff6b00'),
    ]
  }

  start(): void {
    if (this.#running) return
    this.#running = true

    this.#measure()
    this.#seed()

    window.addEventListener('resize', this.#onResize, { passive: true })
    document.addEventListener('visibilitychange', this.#onVisibility)

    if (prefersReducedMotion()) {
      this.#paint()
      return
    }

    if (!isCoarsePointer()) {
      window.addEventListener('pointermove', this.#onPointerMove, { passive: true })
      window.addEventListener('pointerleave', this.#onPointerLeave, { passive: true })
    }

    this.#raf = requestAnimationFrame(this.#frame)
  }

  stop(): void {
    this.#running = false
    cancelAnimationFrame(this.#raf)
    window.clearTimeout(this.#resizeTimer)
    window.removeEventListener('resize', this.#onResize)
    window.removeEventListener('pointermove', this.#onPointerMove)
    window.removeEventListener('pointerleave', this.#onPointerLeave)
    document.removeEventListener('visibilitychange', this.#onVisibility)
  }

  #measure(): void {
    this.#width = window.innerWidth
    this.#height = window.innerHeight
    this.#dpr = Math.min(window.devicePixelRatio || 1, 2)

    this.#canvas.width = Math.round(this.#width * this.#dpr)
    this.#canvas.height = Math.round(this.#height * this.#dpr)
    this.#ctx.setTransform(this.#dpr, 0, 0, this.#dpr, 0, 0)
  }

  #count(): number {
    const area = (this.#width * this.#height) / 1_000_000
    return Math.max(MIN_GRAINS, Math.min(MAX_GRAINS, Math.round(area * DENSITY)))
  }

  #seed(): void {
    const target = this.#count()
    const shapes: Shape[] = ['dot', 'dot', 'pixel', 'cross']

    // Grow or trim rather than rebuilding, so a resize does not teleport every
    // grain that was already on screen.
    while (this.#grains.length > target) this.#grains.pop()

    while (this.#grains.length < target) {
      const i = this.#grains.length
      this.#grains.push({
        x: Math.random() * this.#width,
        y: Math.random() * this.#height,
        vx: (Math.random() - 0.5) * 0.24,
        vy: (Math.random() - 0.5) * 0.24,
        size: 2.2 + Math.random() * 4.4,
        alpha: 0.2 + Math.random() * 0.3,
        hue: this.#palette[i % this.#palette.length]!,
        shape: shapes[i % shapes.length]!,
        angle: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 0.006,
        heat: 0,
      })
    }

    for (const grain of this.#grains) {
      grain.x = Math.min(grain.x, this.#width)
      grain.y = Math.min(grain.y, this.#height)
    }
  }

  readonly #frame = (): void => {
    if (!this.#running) return
    this.#raf = requestAnimationFrame(this.#frame)
    this.#step()
    this.#paint()
  }

  #step(): void {
    const { x: px, y: py, active } = this.#pointer

    for (const grain of this.#grains) {
      // The random walk: a fresh impulse every frame, momentum carried over,
      // and damping so speed stays bounded without clamping it by hand.
      grain.vx = (grain.vx + (Math.random() - 0.5) * JITTER) * DAMPING
      grain.vy = (grain.vy + (Math.random() - 0.5) * JITTER) * DAMPING

      if (active) {
        const dx = grain.x - px
        const dy = grain.y - py
        const dist = Math.hypot(dx, dy)

        if (dist < CURSOR_RADIUS && dist > 0.001) {
          // Falls off with distance, so the edge of the reach is a nudge and
          // the centre is a shove.
          const force = (1 - dist / CURSOR_RADIUS) ** 2 * CURSOR_PUSH
          grain.vx += (dx / dist) * force
          grain.vy += (dy / dist) * force
          grain.heat = Math.min(1, grain.heat + force * 2.2)
        }
      }

      // Push is bounded, and the walk itself refills the void the cursor
      // leaves behind — that is what diffusion does, given a moment.
      const speed = Math.hypot(grain.vx, grain.vy)
      if (speed > MAX_SPEED) {
        grain.vx = (grain.vx / speed) * MAX_SPEED
        grain.vy = (grain.vy / speed) * MAX_SPEED
      }

      grain.x += grain.vx
      grain.y += grain.vy
      grain.angle += grain.spin + grain.heat * 0.05
      grain.heat *= CALM

      // Wrap, so the field never thins out at the edges.
      if (grain.x < -12) grain.x = this.#width + 12
      else if (grain.x > this.#width + 12) grain.x = -12
      if (grain.y < -12) grain.y = this.#height + 12
      else if (grain.y > this.#height + 12) grain.y = -12
    }
  }

  #paint(): void {
    const ctx = this.#ctx
    ctx.clearRect(0, 0, this.#width, this.#height)

    for (const grain of this.#grains) {
      const heat = grain.heat
      const size = grain.size * (1 + heat * 0.85)
      const half = size / 2

      ctx.globalAlpha = Math.min(1, grain.alpha + heat * 0.55)
      ctx.fillStyle = grain.hue

      ctx.save()
      ctx.translate(grain.x, grain.y)
      ctx.rotate(grain.angle)

      // Disturbed grains snap to the sharp pixel form; at rest they are soft.
      const shape = heat > 0.35 ? 'pixel' : grain.shape

      if (shape === 'dot') {
        ctx.beginPath()
        ctx.arc(0, 0, half, 0, Math.PI * 2)
        ctx.fill()
      } else if (shape === 'cross') {
        const arm = half * 0.42
        ctx.fillRect(-half, -arm, size, arm * 2)
        ctx.fillRect(-arm, -half, arm * 2, size)
      } else {
        ctx.beginPath()
        ctx.roundRect(-half, -half, size, size, Math.max(0.5, half * 0.32))
        ctx.fill()
      }

      ctx.restore()
    }

    ctx.globalAlpha = 1
  }

  readonly #onPointerMove = (event: PointerEvent): void => {
    this.#pointer = { x: event.clientX, y: event.clientY, active: true }
  }

  readonly #onPointerLeave = (): void => {
    this.#pointer = { x: -9999, y: -9999, active: false }
  }

  readonly #onResize = (): void => {
    window.clearTimeout(this.#resizeTimer)
    this.#resizeTimer = window.setTimeout(() => {
      this.#measure()
      this.#seed()
      if (prefersReducedMotion()) this.#paint()
    }, 160)
  }

  readonly #onVisibility = (): void => {
    if (document.hidden) {
      cancelAnimationFrame(this.#raf)
      this.#raf = 0
    } else if (this.#running && !prefersReducedMotion() && !this.#raf) {
      this.#raf = requestAnimationFrame(this.#frame)
    }
  }
}

/** Mount the page-wide pollen layer. Idempotent. */
export function mountPollen(): PollenField | null {
  if (document.querySelector('.pollen')) return null

  const canvas = document.createElement('canvas')
  canvas.className = 'pollen'
  canvas.setAttribute('aria-hidden', 'true')
  document.body.prepend(canvas)

  const field = new PollenField(canvas)
  field.start()
  return field
}
