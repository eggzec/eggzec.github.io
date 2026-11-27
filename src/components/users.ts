/**
 * Who uses eggzec: the scrolling logo strip and the /trusted-by/ stories.
 *
 *   <div data-logo-carousel></div>   logo strip, on the landing page and /trusted-by/
 *   <div data-user-stats></div>      dependents per package, on /trusted-by/
 *   <div data-user-stories></div>    user stories, on /trusted-by/
 *
 * The strip follows github.com's customer row: monochrome marks moving slowly
 * in one direction with the edges faded out. Hovering or focusing it pauses
 * the motion, and it stays still for visitors who prefer reduced motion.
 */

import {
  CAROUSEL,
  DEPENDENTS,
  PACKAGE_LABEL,
  TESTIMONIALS,
  storyId,
  type PackageKey,
  type Testimonial,
  type UserLogo,
} from '../data/users'
import { prefersReducedMotion } from '../lib/env'
import { mountLogoFit } from '../lib/logo-fit'

/** Optical size of a square logo (see lib/logo-fit.ts), and the widest a logo may run. */
const STORY_FIT = { base: 112, max: 380 }
const CAROUSEL_FIT = { base: 84, max: 280 }

/** Carousel speed, px per second: slow enough to read a mark in passing. */
const SPEED = 38

const escapeAttr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/**
 * A logo inside its optical-size box. Until the image loads, `h` (the old
 * 35–84 visual weight) gives it a provisional height so the row does not
 * collapse; lib/logo-fit.ts replaces that with the measured size.
 */
function fittedLogo(logo: UserLogo, fit: { base: number; max: number }, alt: string, lazy: boolean): string {
  const provisional = Math.round((logo.h / 63) * fit.base * 0.7)
  return `<span class="logo-fit" data-fit-base="${fit.base}" data-fit-max="${fit.max}"><img src="${logo.src}" alt="${alt}" style="height:${provisional}px"${lazy ? ' loading="lazy"' : ''} decoding="async" draggable="false"></span>`
}

function carouselItem(logo: UserLogo & { story: string }, hidden: boolean): string {
  const tab = hidden ? ' tabindex="-1"' : ''
  return `
    <li class="logo-carousel__item">
      <a href="/trusted-by/#${logo.story}" title="${escapeAttr(logo.name)}"${tab}>
        ${fittedLogo(logo, CAROUSEL_FIT, hidden ? '' : escapeAttr(logo.name), true)}
      </a>
    </li>`
}

export function mountLogoCarousels(root: ParentNode = document): void {
  for (const host of root.querySelectorAll<HTMLElement>('[data-logo-carousel]')) {
    setupCarousel(host)
  }
}

function setupCarousel(host: HTMLElement): void {
  if (host.dataset.mounted) return
  host.dataset.mounted = 'true'

  const group = (hidden: boolean) =>
    `<ul class="logo-carousel__group"${hidden ? ' aria-hidden="true"' : ''}>${CAROUSEL.map((l) => carouselItem(l, hidden)).join('')}</ul>`

  host.classList.add('logo-carousel')
  host.setAttribute('role', 'region')
  host.setAttribute('aria-label', 'Organisations that use eggzec packages')
  host.innerHTML = `
    <div class="logo-carousel__viewport">
      <div class="logo-carousel__track" data-track>${group(false)}${group(true)}</div>
    </div>`

  const track = host.querySelector<HTMLElement>('[data-track]')!
  const first = track.firstElementChild as HTMLElement

  mountLogoFit(host)

  const measure = () => {
    const width = first.getBoundingClientRect().width
    if (width > 0) track.style.setProperty('--carousel-duration', `${width / SPEED}s`)
  }
  measure()
  for (const img of first.querySelectorAll('img')) {
    if (!img.complete) img.addEventListener('load', measure, { once: true })
  }
  new ResizeObserver(measure).observe(first)

  // Hovering or focusing the strip pauses it (CSS). Visitors who asked the OS
  // for reduced motion get a still row.
  host.dataset.paused = String(prefersReducedMotion())
}

/* ---- /trusted-by/ ------------------------------------------------------- */

export function mountUserStats(root: ParentNode = document): void {
  const host = root.querySelector<HTMLElement>('[data-user-stats]')
  if (!host) return

  const keys = Object.keys(DEPENDENTS) as PackageKey[]
  const total = keys.reduce((sum, k) => sum + DEPENDENTS[k].total, 0)

  host.classList.add('stats', 'user-stats')
  host.innerHTML =
    `<div class="stat stat--lead">
      <span class="stat__value" data-count-to="${total}">${total}</span>
      <span class="stat__label">Repositories depend on eggzec packages</span>
    </div>` +
    keys
      .map(
        (k) => `
      <a class="stat stat--link" href="${DEPENDENTS[k].url}" target="_blank" rel="noopener">
        <span class="stat__value" data-count-to="${DEPENDENTS[k].total}">${DEPENDENTS[k].total}</span>
        <span class="stat__label">depend on ${PACKAGE_LABEL[k]}</span>
      </a>`,
      )
      .join('')
}

function storyMarkup(story: Testimonial): string {
  const logos = story.logos
    .map(
      (logo) => `
      <a class="story__logo" href="${logo.href}" target="_blank" rel="noopener" title="${escapeAttr(logo.name)}">
        ${fittedLogo(logo, STORY_FIT, escapeAttr(logo.name), false)}
      </a>`,
    )
    .join('')

  const sources = story.sources
    .map(
      (repo) =>
        `<li><a href="https://github.com/${repo}" target="_blank" rel="noopener">github.com/${repo}</a></li>`,
    )
    .join('')

  return `
    <article class="story" id="${storyId(story)}" data-story data-packages="${story.packages.join(' ')}" data-reveal>
      <div class="story__logos${story.stack ? ' story__logos--stacked' : ''}">${logos}</div>
      <div class="story__main">
        <p class="story__body">${story.body}</p>
        <div class="story__sources">
          <p class="mono story__sources-label">${story.sources.length > 1 ? 'Sources' : 'Source'}</p>
          <ul>${sources}</ul>
        </div>
      </div>
    </article>`
}

export function mountUserStories(root: ParentNode = document): void {
  const host = root.querySelector<HTMLElement>('[data-user-stories]')
  if (!host) return

  host.innerHTML = `<div class="stories">${TESTIMONIALS.map(storyMarkup).join('')}</div>`
  mountLogoFit(host)

  // The stories are rendered after the browser has already tried to honour the
  // URL fragment, so a carousel link like /trusted-by/#nasa-glennopt lands at the
  // top of the page unless we scroll to it ourselves. Logos resize as they
  // load, which moves the target, so scroll again once the page has settled.
  const id = decodeURIComponent(window.location.hash.slice(1))
  const target = id ? document.getElementById(id) : null
  if (target && host.contains(target)) {
    target.dataset.revealed = 'true'
    const go = () => target.scrollIntoView({ block: 'start' })
    requestAnimationFrame(go)
    if (document.readyState !== 'complete') window.addEventListener('load', go, { once: true })
  }
}
