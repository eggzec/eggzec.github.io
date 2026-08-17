/**
 * Data-driven page bodies: the maintainer grid, read from `src/data/site.ts`
 * so a person is described once.
 */

import { PEOPLE, PROJECTS } from '../data/site'
import { USED_BY, dependentName, dependentOwner } from '../data/used-by'

/**
 * `<div data-people>` on /community/.
 *
 * A name, what they do here, and how they describe their work — nothing else.
 * No avatar, no handle, no badge wall: a maintainer is a person to talk to, not
 * a profile to skim, and the card links straight to where their work actually
 * is rather than to a page about them.
 */
export function mountPeople(root: ParentNode = document): void {
  const host = root.querySelector<HTMLElement>('[data-people]')
  if (!host) return

  host.classList.add('people')
  host.innerHTML = PEOPLE.map(
    (person) => `
    <article class="person">
      <a class="person__hit" href="${person.github}" target="_blank" rel="noopener" aria-label="${person.name}, ${person.role}"></a>
      <div>
        <h3 class="person__name">${person.name}</h3>
        <p class="mono person__role">${person.role}</p>
      </div>
      <p class="person__bio">${person.bio}</p>
    </article>`,
  ).join('')
}

/**
 * `<div data-used-by>` in the hero ticker.
 *
 * Fills the strip before the marquee mounts, so it measures real content. Each
 * entry links to the repository it names — the claim is checkable, which is the
 * only reason it is worth making.
 */
export function mountUsedBy(root: ParentNode = document): void {
  const host = root.querySelector<HTMLElement>('[data-used-by]')
  if (!host) return

  host.innerHTML = USED_BY.map((d) => {
    const owner = dependentOwner(d)
    const name = dependentName(d)
    // Plenty of these are named after their org — printing both would just
    // repeat the word.
    const repo =
      name.toLowerCase() === owner.toLowerCase()
        ? ''
        : `<span class="mono used-by__name">${name}</span>`

    return `
      <a class="used-by" href="https://github.com/${d.repo}" target="_blank" rel="noopener"
         title="${d.repo} — depends on ${d.uses.join(', ')}">
        <span class="mono used-by__owner">${owner}</span>${repo}
      </a>`
  }).join('')
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
