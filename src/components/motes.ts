/**
 * Motes — specks suspended across the whole page.
 *
 * A fixed layer behind every section, holding dust in water. Each speck
 * integrates a damped random walk, which is what Brownian motion actually is —
 * momentum plus a fresh impulse every step — so the drift wanders instead of
 * oscillating the way a looped keyframe would.
 *
 * They are deliberately far back: small, plain circles, faint enough to read as
 * depth rather than as content. The cursor is the only thing that brings one
 * forward — specks inside its radius are pushed off it and *excite*, growing
 * and brightening, then decaying back to a drifting speck a second or so after
 * the cursor has gone.
 *
 * One canvas, one loop, one pass per frame. The loop stops when the tab is
 * hidden, and never starts at all under reduced motion — that case gets a
 * single static scatter, which keeps the texture without the movement.
 */

import { isCoarsePointer, prefersReducedMotion } from '../lib/env'

/** Motes per million device-independent pixels of viewport. */
const DENSITY = 150
const MIN_MOTES = 50
const MAX_MOTES = 320

/** How far the cursor reaches, in CSS pixels. */
const CURSOR_RADIUS = 140
/** Impulse the cursor imparts at point blank. */
const CURSOR_PUSH = 0.34
/** Fresh Brownian impulse per frame. */
const JITTER = 0.055
/** Velocity retained each frame — under 1, or the walk runs away. */
const DAMPING = 0.955
/** Ceiling on speed, so a fast cursor cannot fling a mote off screen. */
const MAX_SPEED = 2.6
/** Excitement lost per frame; roughly a second back to rest. */
const CALM = 0.978

interface Mote {
  x: number
  y: number
  vx: number
  vy: number
  /** Radius at rest, in CSS pixels. */
  radius: number
  /** Base opacity at rest. */
  alpha: number
  hue: string
  /** 0 at rest, 1 just disturbed. */
  heat: number
}

export class MoteField {
  readonly #canvas: HTMLCanvasElement
  readonly #ctx: CanvasRenderingContext2D

  #motes: Mote[] = []
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
    if (!ctx) throw new Error('MoteField: 2D canvas context unavailable')
    this.#ctx = ctx

    // Kiwi is a field colour, not a hairline one — it vanishes on white at this
    // size, so the motes take the three hues that hold.
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
    return Math.max(MIN_MOTES, Math.min(MAX_MOTES, Math.round(area * DENSITY)))
  }

  #seed(): void {
    const target = this.#count()

    // Grow or trim rather than rebuilding, so a resize does not teleport every
    // mote that was already on screen.
    while (this.#motes.length > target) this.#motes.pop()

    while (this.#motes.length < target) {
      const i = this.#motes.length
      this.#motes.push({
        x: Math.random() * this.#width,
        y: Math.random() * this.#height,
        vx: (Math.random() - 0.5) * 0.24,
        vy: (Math.random() - 0.5) * 0.24,
        radius: 0.7 + Math.random() * 1.35,
        alpha: 0.13 + Math.random() * 0.2,
        hue: this.#palette[i % this.#palette.length]!,
        heat: 0,
      })
    }

    for (const mote of this.#motes) {
      mote.x = Math.min(mote.x, this.#width)
      mote.y = Math.min(mote.y, this.#height)
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

    for (const mote of this.#motes) {
      // The random walk: a fresh impulse every frame, momentum carried over,
      // and damping so speed stays bounded without clamping it by hand.
      mote.vx = (mote.vx + (Math.random() - 0.5) * JITTER) * DAMPING
      mote.vy = (mote.vy + (Math.random() - 0.5) * JITTER) * DAMPING

      if (active) {
        const dx = mote.x - px
        const dy = mote.y - py
        const dist = Math.hypot(dx, dy)

        if (dist < CURSOR_RADIUS && dist > 0.001) {
          // Falls off with distance, so the edge of the reach is a nudge and
          // the centre is a shove.
          const force = (1 - dist / CURSOR_RADIUS) ** 2 * CURSOR_PUSH
          mote.vx += (dx / dist) * force
          mote.vy += (dy / dist) * force
          mote.heat = Math.min(1, mote.heat + force * 2.2)
        }
      }

      // Push is bounded, and the walk itself refills the void the cursor
      // leaves behind — that is what diffusion does, given a moment.
      const speed = Math.hypot(mote.vx, mote.vy)
      if (speed > MAX_SPEED) {
        mote.vx = (mote.vx / speed) * MAX_SPEED
        mote.vy = (mote.vy / speed) * MAX_SPEED
      }

      mote.x += mote.vx
      mote.y += mote.vy
      mote.heat *= CALM

      // Wrap, so the field never thins out at the edges.
      if (mote.x < -12) mote.x = this.#width + 12
      else if (mote.x > this.#width + 12) mote.x = -12
      if (mote.y < -12) mote.y = this.#height + 12
      else if (mote.y > this.#height + 12) mote.y = -12
    }
  }

  #paint(): void {
    const ctx = this.#ctx
    ctx.clearRect(0, 0, this.#width, this.#height)

    // Circles only, and no transform stack: at this size anything with a
    // corner reads as an artefact rather than as a speck.
    for (const mote of this.#motes) {
      const heat = mote.heat

      ctx.globalAlpha = Math.min(0.9, mote.alpha + heat * 0.5)
      ctx.fillStyle = mote.hue

      ctx.beginPath()
      ctx.arc(mote.x, mote.y, mote.radius * (1 + heat * 1.3), 0, Math.PI * 2)
      ctx.fill()
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

/** Mount the page-wide mote layer. Idempotent. */
export function mountMotes(): MoteField | null {
  if (document.querySelector('.motes')) return null

  const canvas = document.createElement('canvas')
  canvas.className = 'motes'
  canvas.setAttribute('aria-hidden', 'true')
  document.body.prepend(canvas)

  const field = new MoteField(canvas)
  field.start()
  return field
}
