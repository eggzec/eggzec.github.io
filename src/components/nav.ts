/**
 * Site header.
 *
 * Rendered from `NAV` into the `<header data-nav>` placeholder every page
 * carries, so navigation only has to be edited in one place. The desktop
 * "Projects" item opens an astral-style mega menu — icon tile, name, one line
 * of description per row. Below 900px the whole thing collapses into a panel.
 */

import { animate } from 'motion'
import { NAV, ORG, projectLabel, type NavItem, type Project } from '../data/site'
import { prefersReducedMotion } from '../lib/env'
import { letter } from '../lib/eggzec-block'

const MENU_OPEN_MS = 220

function projectIcon(project: Project): string {
  if (!project.icon) {
    return `<span class="tile tile--placeholder" aria-hidden="true">${projectLabel(project).slice(0, 2)}</span>`
  }
  return `<img class="tile" src="/brand/icons/${project.icon}" alt="" width="40" height="40" loading="lazy" decoding="async">`
}

function menuMarkup(items: Project[]): string {
  const rows = items
    .map(
      (project) => `
      <a class="menu__row" href="${project.github}" target="_blank" rel="noopener">
        ${projectIcon(project)}
        <span class="menu__text">
          <span class="menu__name">${projectLabel(project)}</span>
          <span class="menu__desc">${project.tagline}</span>
        </span>
      </a>`,
    )
    .join('')

  return `
    <div class="menu" data-menu hidden>
      <div class="menu__inner">
        <div class="menu__rows">${rows}</div>
        <a class="menu__all" href="/projects/">
          <span>All projects</span>
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
        </a>
      </div>
    </div>`
}

function itemMarkup(item: NavItem, path: string): string {
  const active = path === item.href || (item.href !== '/' && path.startsWith(item.href))
  const current = active ? ' aria-current="page"' : ''

  if (item.menu) {
    return `
      <li class="nav__item nav__item--has-menu" data-menu-root>
        <button class="nav__link" type="button" aria-expanded="false" data-menu-trigger${current}>
          <span>${item.label}</span>
          <svg class="nav__chevron" viewBox="0 0 12 12" width="10" height="10" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 4.5 6 8l3.5-3.5"/></svg>
        </button>
        ${menuMarkup(item.menu)}
      </li>`
  }

  return `<li class="nav__item"><a class="nav__link" href="${item.href}"${current}>${item.label}</a></li>`
}

/** Inline the block wordmark at nav scale — no font file, no layout shift. */
function wordmarkMarkup(): string {
  const g = letter('EGGZEC', 0.6)
  return `<svg class="brand__word" viewBox="${g.viewBox}" height="15" fill="currentColor" role="img" aria-label="eggzec"><path d="${g.d}"/></svg>`
}

export function mountNav(): void {
  const host = document.querySelector<HTMLElement>('header[data-nav]')
  if (!host) return

  const path = window.location.pathname.replace(/index\.html$/, '')

  host.className = 'site-header'
  host.innerHTML = `
    <div class="site-header__bar">
      <div class="container site-header__inner">
        <a class="brand" href="/" aria-label="eggzec home">
          <img class="brand__mark" src="/brand/eggzec-mark.svg" alt="" width="34" height="34" data-egg>
          ${wordmarkMarkup()}
        </a>

        <nav class="nav" aria-label="Primary">
          <ul class="nav__list">
            ${NAV.map((item) => itemMarkup(item, path)).join('')}
          </ul>
        </nav>

        <div class="site-header__actions">
          <a class="button button--ghost site-header__gh" href="${ORG.github}" target="_blank" rel="noopener">
            <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38v-1.33c-2.23.48-2.7-1.07-2.7-1.07-.36-.93-.89-1.18-.89-1.18-.73-.5.05-.49.05-.49.81.06 1.23.83 1.23.83.72 1.23 1.89.87 2.35.67.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.83-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.52.56.83 1.28.83 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>
            <span>GitHub</span>
          </a>

          <button class="icon-button nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" data-nav-toggle>
            <span class="nav-toggle__box" aria-hidden="true"><i></i><i></i></span>
            <span class="visually-hidden">Menu</span>
          </button>
        </div>
      </div>
    </div>

    <div class="mobile-nav" id="mobile-nav" data-mobile-nav hidden>
      <div class="container mobile-nav__inner">
        <ul class="mobile-nav__list">
          ${NAV.map((item) => `<li><a href="${item.href}">${item.label}</a></li>`).join('')}
        </ul>
        <div class="mobile-nav__projects">
          <p class="mono mobile-nav__label">Featured</p>
          ${(NAV.find((n) => n.menu)?.menu ?? [])
            .map(
              (p) => `<a class="menu__row" href="${p.github}" target="_blank" rel="noopener">
                ${projectIcon(p)}
                <span class="menu__text">
                  <span class="menu__name">${projectLabel(p)}</span>
                  <span class="menu__desc">${p.tagline}</span>
                </span>
              </a>`,
            )
            .join('')}
        </div>
      </div>
    </div>`

  wireMegaMenus(host)
  wireMobileNav(host)
  wireScrollState(host)
}

function wireMegaMenus(host: HTMLElement): void {
  const roots = Array.from(host.querySelectorAll<HTMLElement>('[data-menu-root]'))
  const reduced = prefersReducedMotion()
  let closeTimer = 0

  const close = (root: HTMLElement, immediate = false) => {
    const trigger = root.querySelector<HTMLButtonElement>('[data-menu-trigger]')
    const menu = root.querySelector<HTMLElement>('[data-menu]')
    if (!trigger || !menu || trigger.getAttribute('aria-expanded') === 'false') return

    trigger.setAttribute('aria-expanded', 'false')
    root.dataset.open = 'false'

    if (reduced || immediate) {
      menu.hidden = true
      return
    }
    animate(
      menu,
      { opacity: [1, 0], transform: ['translateY(0px) scale(1)', 'translateY(-6px) scale(0.985)'] },
      { duration: MENU_OPEN_MS / 1000, ease: [0.4, 0, 1, 1] },
    ).then(() => {
      // Guard against a re-open that landed while the close was still playing.
      if (trigger.getAttribute('aria-expanded') === 'false') menu.hidden = true
    })
  }

  const open = (root: HTMLElement) => {
    const trigger = root.querySelector<HTMLButtonElement>('[data-menu-trigger]')
    const menu = root.querySelector<HTMLElement>('[data-menu]')
    if (!trigger || !menu) return

    for (const other of roots) if (other !== root) close(other, true)

    menu.hidden = false
    trigger.setAttribute('aria-expanded', 'true')
    root.dataset.open = 'true'

    if (reduced) return
    animate(
      menu,
      { opacity: [0, 1], transform: ['translateY(-6px) scale(0.985)', 'translateY(0px) scale(1)'] },
      { duration: 0.26, ease: [0.22, 1, 0.36, 1] },
    )
    const rows = menu.querySelectorAll<HTMLElement>('.menu__row')
    rows.forEach((row, i) => {
      animate(
        row,
        { opacity: [0, 1], transform: ['translateY(6px)', 'translateY(0px)'] },
        { duration: 0.28, delay: 0.03 + i * 0.035, ease: [0.22, 1, 0.36, 1] },
      )
    })
  }

  for (const root of roots) {
    const trigger = root.querySelector<HTMLButtonElement>('[data-menu-trigger]')
    if (!trigger) continue

    trigger.addEventListener('click', () => {
      trigger.getAttribute('aria-expanded') === 'true' ? close(root) : open(root)
    })

    root.addEventListener('pointerenter', () => {
      window.clearTimeout(closeTimer)
      if (window.matchMedia('(hover: hover)').matches) open(root)
    })

    root.addEventListener('pointerleave', () => {
      window.clearTimeout(closeTimer)
      closeTimer = window.setTimeout(() => close(root), 140)
    })

    root.addEventListener('focusout', (event) => {
      if (!root.contains(event.relatedTarget as Node)) close(root)
    })
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') for (const root of roots) close(root)
  })

  document.addEventListener('click', (event) => {
    for (const root of roots) {
      if (!root.contains(event.target as Node)) close(root)
    }
  })
}

function wireMobileNav(host: HTMLElement): void {
  const toggle = host.querySelector<HTMLButtonElement>('[data-nav-toggle]')
  const panel = host.querySelector<HTMLElement>('[data-mobile-nav]')
  if (!toggle || !panel) return

  const setOpen = (open: boolean) => {
    toggle.setAttribute('aria-expanded', String(open))
    document.documentElement.classList.toggle('is-nav-open', open)
    if (open) {
      panel.hidden = false
      if (!prefersReducedMotion()) {
        animate(panel, { opacity: [0, 1] }, { duration: 0.2 })
        animate(
          Array.from(panel.querySelectorAll<HTMLElement>('.mobile-nav__list li, .menu__row')),
          { opacity: [0, 1], transform: ['translateY(10px)', 'translateY(0px)'] },
          { duration: 0.34, delay: (i: number) => 0.04 + i * 0.035, ease: [0.22, 1, 0.36, 1] },
        )
      }
    } else {
      panel.hidden = true
    }
  }

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true')
  })

  for (const link of panel.querySelectorAll('a')) {
    link.addEventListener('click', () => setOpen(false))
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false)
  })

  const mq = window.matchMedia('(min-width: 901px)')
  mq.addEventListener('change', (event) => {
    if (event.matches) setOpen(false)
  })
}

/** Adds a hairline + blur once the page has scrolled past the hero lip. */
function wireScrollState(host: HTMLElement): void {
  let ticking = false
  const update = () => {
    host.dataset.scrolled = String(window.scrollY > 12)
    ticking = false
  }
  update()
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    },
    { passive: true },
  )
}
