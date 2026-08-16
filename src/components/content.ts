/**
 * Data-driven page bodies: the maintainer grid and the individual maintainer
 * profiles, both read from `src/data/site.ts` so a person is described once.
 */

import { PEOPLE, PROJECTS, type Person } from '../data/site'

function linkList(person: Person): string {
  return person.links
    .map((link) => {
      const external = !link.href.startsWith('mailto:')
      return `<a href="${link.href}"${external ? ' target="_blank" rel="noopener"' : ''}>${link.label}</a>`
    })
    .join('')
}

/** `<div data-people>` on /community/. */
export function mountPeople(root: ParentNode = document): void {
  const host = root.querySelector<HTMLElement>('[data-people]')
  if (!host) return

  host.classList.add('people')
  host.innerHTML = PEOPLE.map(
    (person) => `
    <article class="person">
      <a class="person__hit" href="/community/${person.slug}/" aria-label="${person.name}, ${person.role}"></a>
      <img class="person__avatar" src="${person.avatar}" alt="" width="72" height="72" loading="lazy" decoding="async">
      <div>
        <h3 class="person__name">${person.name}</h3>
        <p class="mono person__role">${person.role}</p>
      </div>
      <p class="person__bio">${person.bio}</p>
      <div class="tag-row">
        ${person.stack.map((s) => `<span class="pill">${s}</span>`).join('')}
      </div>
    </article>`,
  ).join('')
}

/** `<div data-profile="saud">` on each maintainer page. */
export function mountProfile(root: ParentNode = document): void {
  const host = root.querySelector<HTMLElement>('[data-profile]')
  if (!host) return

  const person = PEOPLE.find((p) => p.slug === host.dataset.profile)
  if (!person) return

  document.title = `${person.name} · eggzec`

  host.classList.add('profile')
  host.innerHTML = `
    <img class="profile__avatar" src="${person.avatar}" alt="${person.name}" width="200" height="200">
    <div>
      <p class="mono section__eyebrow">${person.role}</p>
      <h1 class="page-header__title" style="margin-bottom: var(--space-4)">${person.name}</h1>
      <p class="prose" style="margin-bottom: var(--space-5)">${person.bio}</p>
      <div class="lead-links" style="margin-bottom: var(--space-5)">${linkList(person)}</div>
      <div class="tag-row">
        ${person.stack.map((s) => `<span class="pill">${s}</span>`).join('')}
      </div>
    </div>`
}

/**
 * Fills `[data-stat]` elements from the catalog rather than from hard-coded
 * markup, so the landing-page numbers cannot drift from what is actually
 * listed on the site.
 */
export function syncStats(root: ParentNode = document): void {
  const totals: Record<string, number> = {
    projects: PROJECTS.length,
    packages: PROJECTS.filter((p) => p.pypi).length,
    docs: PROJECTS.filter((p) => p.docs).length,
    maintainers: PEOPLE.length,
  }

  for (const node of root.querySelectorAll<HTMLElement>('[data-stat]')) {
    const key = node.dataset.stat ?? ''
    const value = totals[key]
    if (value === undefined) continue
    node.dataset.countTo = String(value)
    node.textContent = `${value}${node.dataset.countSuffix ?? ''}`
  }
}
