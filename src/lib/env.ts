/** Small environment helpers shared across components. */

/** True when the visitor asked the OS to reduce motion. */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Fires whenever the reduced-motion preference flips. */
export function onReducedMotionChange(handler: (reduced: boolean) => void): () => void {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  const listener = (e: MediaQueryListEvent) => handler(e.matches)
  mq.addEventListener('change', listener)
  return () => mq.removeEventListener('change', listener)
}

/** Coarse pointer (touch) devices skip hover-only affordances. */
export function isCoarsePointer(): boolean {
  return window.matchMedia('(pointer: coarse)').matches
}

/** Viewport width shorthand. */
export function isMobile(): boolean {
  return window.matchMedia('(max-width: 860px)').matches
}

/** `document.querySelector` that narrows and never returns null silently. */
export function must<T extends Element>(selector: string, root: ParentNode = document): T {
  const el = root.querySelector<T>(selector)
  if (!el) throw new Error(`Expected element matching "${selector}"`)
  return el
}

/** `querySelectorAll` as a real array. */
export function all<T extends Element>(selector: string, root: ParentNode = document): T[] {
  return Array.from(root.querySelectorAll<T>(selector))
}

/** Clamp helper. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

/** Linear interpolation. */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

declare global {
  interface WindowEventMap {
    'eggzec:themechange': CustomEvent<{ theme: 'light' | 'dark' }>
  }
}
