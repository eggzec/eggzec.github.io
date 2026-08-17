/** Site footer, rendered into the `<footer data-footer>` placeholder. */

import { ORG, PROJECTS } from '../data/site'
import { letter } from '../lib/eggzec-block'

const COLUMNS: Array<{ title: string; links: Array<{ label: string; href: string; external?: boolean }> }> = [
  {
    title: 'Projects',
    links: [
      { label: 'All projects', href: '/projects/' },
      { label: 'PySwarm', href: 'https://eggzec.github.io/pyswarm/', external: true },
      { label: 'PyDOE', href: 'https://pydoe.github.io/pydoe/', external: true },
      { label: 'MCERP', href: 'https://eggzec.github.io/mcerp/', external: true },
      { label: 'NLPQL', href: 'https://eggzec.github.io/nlpql/', external: true },
    ],
  },
  {
    title: 'Community',
    links: [{ label: 'Maintainers', href: '/community/' }],
  },
  {
    title: 'Elsewhere',
    links: [
      { label: 'GitHub', href: ORG.github, external: true },
      { label: 'PyPI', href: ORG.pypi, external: true },
    ],
  },
]

export function mountFooter(): void {
  const host = document.querySelector<HTMLElement>('footer[data-footer]')
  if (!host) return

  const g = letter('EGGZEC', 0.8)
  const packages = PROJECTS.filter((p) => p.pypi).length

  host.className = 'site-footer'
  host.innerHTML = `
    <div class="container">
      <div class="site-footer__top">
        <div class="site-footer__brand">
          <a class="brand brand--footer" href="/" aria-label="eggzec home">
            <img class="brand__mark" src="/brand/eggzec-mark.svg" alt="" width="44" height="44">
            <svg class="brand__word" viewBox="${g.viewBox}" height="19" fill="currentColor" role="img" aria-label="eggzec"><path d="${g.d}"/></svg>
          </a>
          <p class="site-footer__blurb">${ORG.description}</p>
          <p class="mono site-footer__meta">
            ${PROJECTS.length} public repositories · ${packages} packages on PyPI
          </p>
        </div>

        <div class="site-footer__cols">
          ${COLUMNS.map(
            (col) => `
            <nav class="site-footer__col" aria-label="${col.title}">
              <h2 class="mono site-footer__title">${col.title}</h2>
              <ul>
                ${col.links
                  .map(
                    (l) =>
                      `<li><a href="${l.href}"${l.external ? ' target="_blank" rel="noopener"' : ''}>${l.label}</a></li>`,
                  )
                  .join('')}
              </ul>
            </nav>`,
          ).join('')}
        </div>
      </div>

      <div class="site-footer__rule" data-draw-field="rule" aria-hidden="true"></div>

      <div class="site-footer__bottom">
        <p class="mono">© ${ORG.year} ${ORG.name} · ${ORG.tagline}</p>
        <p class="mono">
          <a href="${ORG.github}" target="_blank" rel="noopener">GitHub</a>
        </p>
      </div>
    </div>`
}
