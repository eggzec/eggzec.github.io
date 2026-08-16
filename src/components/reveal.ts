/**
 * Scroll choreography.
 *
 * Three primitives, all opt-in from markup so pages stay declarative:
 *
 *   [data-reveal]           fade + rise once the element enters the viewport
 *   [data-reveal-group]     the same, staggered across the element's children
 *   [data-parallax="0.15"]  translate proportional to scroll progress
 *
 * Everything short-circuits under `prefers-reduced-motion`: elements are simply
 * made visible, with no transform and no scroll listener.
 */

import { animate, inView, scroll, stagger } from 'motion'
import { prefersReducedMotion } from '../lib/env'

const DISTANCE = 22

export function mountReveals(root: ParentNode = document): void {
  const reduced = prefersReducedMotion()

  const singles = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'))
  const groups = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal-group]'))

  if (reduced) {
    for (const el of [...singles, ...groups]) el.dataset.revealed = 'true'
    for (const group of groups) {
      for (const child of group.children) (child as HTMLElement).dataset.revealed = 'true'
    }
    return
  }

  for (const el of singles) {
    const delay = Number(el.dataset.revealDelay ?? 0) / 1000
    inView(
      el,
      () => {
        animate(
          el,
          { opacity: [0, 1], transform: [`translateY(${DISTANCE}px)`, 'translateY(0px)'] },
          { duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] },
        )
        el.dataset.revealed = 'true'
      },
      { amount: 0.15, margin: '0px 0px -8% 0px' },
    )
  }

  for (const group of groups) {
    const children = Array.from(group.children) as HTMLElement[]
    if (children.length === 0) continue
    const step = Number(group.dataset.revealStagger ?? 55) / 1000

    inView(
      group,
      () => {
        animate(
          children,
          { opacity: [0, 1], transform: [`translateY(${DISTANCE}px)`, 'translateY(0px)'] },
          { duration: 0.6, delay: stagger(step), ease: [0.22, 1, 0.36, 1] },
        )
        for (const child of children) child.dataset.revealed = 'true'
        group.dataset.revealed = 'true'
      },
      { amount: 0.1, margin: '0px 0px -6% 0px' },
    )
  }

  mountParallax(root)
}

function mountParallax(root: ParentNode): void {
  for (const el of root.querySelectorAll<HTMLElement>('[data-parallax]')) {
    const strength = Number(el.dataset.parallax ?? 0.12)
    scroll(
      (progress: number) => {
        el.style.setProperty('--parallax', `${(progress - 0.5) * strength * 220}px`)
      },
      { target: el, offset: ['start end', 'end start'] },
    )
  }
}

/**
 * Count-up for stat tiles. Reads the target from `data-count-to` and respects
 * reduced motion by writing the final value immediately.
 */
export function mountCounters(root: ParentNode = document): void {
  const nodes = Array.from(root.querySelectorAll<HTMLElement>('[data-count-to]'))
  const reduced = prefersReducedMotion()

  for (const node of nodes) {
    const to = Number(node.dataset.countTo ?? 0)
    const suffix = node.dataset.countSuffix ?? ''

    if (reduced || !Number.isFinite(to)) {
      node.textContent = `${to}${suffix}`
      continue
    }

    node.textContent = `0${suffix}`
    inView(
      node,
      () => {
        animate(0, to, {
          duration: 1.35,
          ease: [0.16, 1, 0.3, 1],
          onUpdate: (value: number) => {
            node.textContent = `${Math.round(value)}${suffix}`
          },
        })
      },
      { amount: 0.6 },
    )
  }
}
