/**
 * Entry point for every page.
 *
 * Each module is defensive about missing markup — mounting is idempotent and a
 * page only gets the behaviour whose hooks it actually contains, so all ten
 * documents can share one bundle.
 */

import Lenis from 'lenis'

import './styles/tokens.css'
import './styles/base.css'
import './styles/layout.css'
import './styles/components.css'
import './styles/pages.css'

import { mountNav } from './components/nav'
import { mountFooter } from './components/footer'
import { mountCounters, mountReveals } from './components/reveal'
import { mountDisplayType } from './components/wordmark'
import { mountDrawFields } from './components/draw-field'
import { mountMarquees } from './components/marquee'
import { mountPixelRules } from './components/pixel-rule'
import { mountPointerEffects } from './components/pointer'
import { mountMotes } from './components/motes'
import { mountFeaturedGrid, mountCatalog } from './components/project-cards'
import { mountPeople, mountUsedBy, syncStats } from './components/content'
import { defineEggzecText } from './lib/eggzec-block'
import { prefersReducedMotion } from './lib/env'

function mountSmoothScroll(): void {
  if (prefersReducedMotion()) return

  const lenis = new Lenis({
    duration: 1.05,
    easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.6,
  })

  const raf = (time: number) => {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  // Let in-page anchors ride the same easing.
  for (const link of document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')) {
    link.addEventListener('click', (event) => {
      const id = link.getAttribute('href')
      if (!id || id === '#') return
      const target = document.querySelector(id)
      if (!target) return
      event.preventDefault()
      lenis.scrollTo(target as HTMLElement, { offset: -96 })
    })
  }
}

function boot(): void {
  defineEggzecText()

  // Chrome first, so nav/footer hooks exist for the passes that follow.
  mountNav()
  mountFooter()

  // Page content. `syncStats` runs before the counters so they animate toward
  // numbers derived from the catalog rather than whatever the markup shipped.
  mountFeaturedGrid()
  mountCatalog()
  mountPeople()
  mountUsedBy()
  syncStats()
  mountDisplayType()

  // Behaviour over whatever ended up in the DOM.
  mountDrawFields()
  mountMarquees()
  mountPixelRules()
  mountReveals()
  mountCounters()
  mountPointerEffects()
  mountMotes()
  mountSmoothScroll()

  document.documentElement.dataset.ready = 'true'
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true })
} else {
  boot()
}
