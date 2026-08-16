/**
 * Pixel step rule — the eggzec section divider.
 *
 * astral.sh separates sections with an animated rounded notch. The eggzec
 * equivalent is drawn from the same grid the logo and the display font use: a
 * run of square cells along the section edge, a deterministic handful of them
 * kiwi, revealed left-to-right as the divider scrolls into view.
 *
 * The lit pattern is derived from the element's index and cell position rather
 * than `Math.random`, so a divider looks identical on every load and does not
 * shimmer between hot reloads.
 */

import { animate, inView, stagger } from 'motion'
import { prefersReducedMotion } from '../lib/env'

const CELL = 12
const LIT_EVERY = 7

export function mountPixelRules(root: ParentNode = document): void {
  const rules = Array.from(root.querySelectorAll<HTMLElement>('[data-pixel-rule]'))
  if (rules.length === 0) return

  rules.forEach((host, ruleIndex) => {
    host.classList.add('pixel-rule')
    host.setAttribute('aria-hidden', 'true')

    const build = () => {
      const count = Math.max(8, Math.ceil(host.getBoundingClientRect().width / CELL))
      const cells: string[] = []

      let litIndex = 0
      for (let i = 0; i < count; i++) {
        // A sparse, repeating pattern with a per-divider phase offset. Lit
        // cells cycle the four Electropop hues rather than all being kiwi.
        const lit = (i + ruleIndex * 3) % LIT_EVERY === 0 || (i + ruleIndex) % 23 === 0
        cells.push(lit ? `<i data-lit="${(litIndex++ + ruleIndex) % 4}"></i>` : '<i></i>')
      }

      host.innerHTML = cells.join('')
    }

    build()

    let resizeTimer = 0
    new ResizeObserver(() => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(build, 150)
    }).observe(host)

    if (prefersReducedMotion()) {
      host.dataset.revealed = 'true'
      return
    }

    inView(
      host,
      () => {
        const cells = Array.from(host.children) as HTMLElement[]
        animate(
          cells,
          { opacity: [0, 1], transform: ['scaleY(0.2)', 'scaleY(1)'] },
          { duration: 0.34, delay: stagger(0.006), ease: [0.22, 1, 0.36, 1] },
        )
        host.dataset.revealed = 'true'
      },
      { amount: 0.4 },
    )
  })
}
