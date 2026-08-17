/**
 * Project cards — the featured grid on the landing page and the filterable
 * catalog on /projects/.
 *
 * Both read from the same `PROJECTS` array, so a repository only ever has to
 * be described once. The whole card targets the repository; docs and PyPI are
 * explicit secondary links.
 */

import { animate, stagger } from 'motion'
import {
  CATEGORY_BLURB,
  CATEGORY_ORDER,
  FEATURED,
  PROJECTS,
  projectLabel,
  type Category,
  type Project,
} from '../data/site'
import { prefersReducedMotion } from '../lib/env'

function iconMarkup(project: Project, size: number): string {
  if (!project.icon) {
    const initials = projectLabel(project).replace(/[^A-Za-z0-9]/g, '').slice(0, 2)
    return `<span class="tile tile--placeholder" style="--tile-size:${size}px" aria-hidden="true">${initials}</span>`
  }
  return `<img class="tile" style="--tile-size:${size}px" src="/brand/icons/${project.icon}" alt="" width="${size}" height="${size}" loading="lazy" decoding="async">`
}

function linkRow(project: Project): string {
  const links: string[] = []
  if (project.docs) {
    links.push(`<a class="card__link" href="${project.docs}" target="_blank" rel="noopener">Docs</a>`)
  }
  links.push(`<a class="card__link" href="${project.github}" target="_blank" rel="noopener">Source</a>`)
  if (project.pypi) {
    links.push(
      `<a class="card__link" href="https://pypi.org/project/${project.pypi}/" target="_blank" rel="noopener">PyPI</a>`,
    )
  }
  return `<div class="card__links">${links.join('')}</div>`
}

function cardMarkup(project: Project, size: number): string {
  const label = projectLabel(project)
  return `
    <article class="card" data-card data-category="${project.category}">
      <a class="card__hit" href="${project.github}" target="_blank" rel="noopener" aria-label="${label} on GitHub. ${project.tagline}"></a>
      <div class="card__head">
        ${iconMarkup(project, size)}
        <h3 class="card__name">${label}</h3>
      </div>
      <p class="card__desc">${project.tagline}</p>
      ${linkRow(project)}
      <span class="card__arrow" aria-hidden="true">
        <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10"/></svg>
      </span>
    </article>`
}

/** `<div data-project-grid>` on the landing page — the icon-bearing projects. */
export function mountFeaturedGrid(root: ParentNode = document): void {
  const host = root.querySelector<HTMLElement>('[data-project-grid]')
  if (!host) return

  host.classList.add('card-grid')
  host.innerHTML = FEATURED.map((p) => cardMarkup(p, 44)).join('')
}

/**
 * `<div data-project-catalog>` on /projects/.
 *
 * Every project, grouped by category and nothing else. There is no featured
 * block here: almost everything carries an icon now, so "featured" stopped
 * separating anything, and it meant a reader met the same card twice.
 */
export function mountCatalog(root: ParentNode = document): void {
  const host = root.querySelector<HTMLElement>('[data-project-catalog]')
  if (!host) return

  const counts = new Map<Category, number>()
  for (const p of PROJECTS) counts.set(p.category, (counts.get(p.category) ?? 0) + 1)
  const sections = CATEGORY_ORDER.filter((c) => (counts.get(c) ?? 0) > 0)

  const filters = `
    <div class="filters" role="group" aria-label="Filter projects by category">
      <button class="chip" type="button" data-filter="all" aria-pressed="true">
        All <span class="chip__count">${PROJECTS.length}</span>
      </button>
      ${CATEGORY_ORDER.map((c) => {
        const total = PROJECTS.filter((p) => p.category === c).length
        return total === 0
          ? ''
          : `<button class="chip" type="button" data-filter="${c}" aria-pressed="false">
              ${c} <span class="chip__count">${total}</span>
            </button>`
      }).join('')}
    </div>`

  const body = sections
    .map((category) => {
      const items = PROJECTS.filter((p) => p.category === category)
      return `
        <section class="catalog__section" data-section="${category}">
          <header class="catalog__header">
            <h2 class="catalog__title">${category}</h2>
            <p class="catalog__blurb">${CATEGORY_BLURB[category]}</p>
          </header>
          <div class="card-grid" data-reveal-group data-reveal-stagger="40">
            ${items.map((p) => cardMarkup(p, 40)).join('')}
          </div>
        </section>`
    })
    .join('')

  host.innerHTML = filters + `<div class="catalog__body">${body}</div>`
  wireFilters(host)
}

function wireFilters(host: HTMLElement): void {
  const chips = Array.from(host.querySelectorAll<HTMLButtonElement>('[data-filter]'))
  const sections = Array.from(host.querySelectorAll<HTMLElement>('[data-section]'))

  for (const chip of chips) {
    chip.addEventListener('click', () => {
      const filter = chip.dataset.filter ?? 'all'

      for (const other of chips) other.setAttribute('aria-pressed', String(other === chip))

      for (const section of sections) {
        section.hidden = filter !== 'all' && section.dataset.section !== filter
      }

      if (prefersReducedMotion()) return

      const cards = sections
        .filter((s) => !s.hidden)
        .flatMap((s) => Array.from(s.querySelectorAll<HTMLElement>('.card')))
      animate(
        cards,
        { opacity: [0, 1], transform: ['translateY(10px) scale(0.99)', 'translateY(0) scale(1)'] },
        { duration: 0.4, delay: stagger(0.018), ease: [0.22, 1, 0.36, 1] },
      )
    })
  }
}
