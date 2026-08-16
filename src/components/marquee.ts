/**
 * Infinite marquee.
 *
 * Duplicates its track until the strip is at least twice the viewport width,
 * then translates by exactly one copy — so the loop is seamless regardless of
 * content width. Speed is expressed in px/second, which keeps long and short
 * strips moving at the same visual pace.
 *
 *   <div data-marquee data-speed="42" data-direction="-1"> …items… </div>
 */

import { prefersReducedMotion } from '../lib/env'

export function mountMarquees(root: ParentNode = document): void {
  for (const host of root.querySelectorAll<HTMLElement>('[data-marquee]')) {
    setupMarquee(host)
  }
}

function setupMarquee(host: HTMLElement): void {
  const original = Array.from(host.children) as HTMLElement[]
  if (original.length === 0) return

  const speed = Number(host.dataset.speed ?? 40)
  const direction = Number(host.dataset.direction ?? 1) >= 0 ? 1 : -1

  const viewport = document.createElement('div')
  viewport.className = 'marquee__viewport'

  const track = document.createElement('div')
  track.className = 'marquee__track'

  const group = document.createElement('div')
  group.className = 'marquee__group'
  group.append(...original)
  track.append(group)
  viewport.append(track)
  host.replaceChildren(viewport)
  host.classList.add('marquee')

  const measure = () => {
    // Reset to a single group before measuring, then top up.
    for (const clone of Array.from(track.querySelectorAll('.marquee__group[data-clone]'))) {
      clone.remove()
    }

    const groupWidth = group.getBoundingClientRect().width
    if (groupWidth < 1) return

    const needed = Math.ceil((host.getBoundingClientRect().width * 2) / groupWidth)
    for (let i = 0; i < Math.max(1, needed); i++) {
      const clone = group.cloneNode(true) as HTMLElement
      clone.dataset.clone = 'true'
      clone.setAttribute('aria-hidden', 'true')
      track.append(clone)
    }

    track.style.setProperty('--marquee-shift', `${groupWidth}px`)
    track.style.setProperty('--marquee-duration', `${groupWidth / speed}s`)
    track.style.setProperty('--marquee-direction', direction > 0 ? 'normal' : 'reverse')
    track.dataset.animated = String(!prefersReducedMotion())
  }

  measure()

  // Late-loading logos change the group width — re-measure when they land.
  for (const img of host.querySelectorAll('img')) {
    if (!img.complete) img.addEventListener('load', measure, { once: true })
  }

  let resizeTimer = 0
  new ResizeObserver(() => {
    window.clearTimeout(resizeTimer)
    resizeTimer = window.setTimeout(measure, 120)
  }).observe(host)
}
