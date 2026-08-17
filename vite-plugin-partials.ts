import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { Plugin } from 'vite'

/**
 * Minimal HTML include + interpolation, so ten static pages can share one
 * `<head>` without pulling in a template engine.
 *
 * A page declares its metadata in a leading comment and marks where the shared
 * partial goes:
 *
 *   <!-- meta: {"title": "Projects", "description": "…", "path": "/projects/"} -->
 *   …
 *   <!--@include head-->
 *
 * `{{key}}` inside the partial is replaced from that metadata (plus the
 * defaults below). Unknown keys resolve to an empty string rather than leaking
 * a literal `{{key}}` into the markup.
 */

const DEFAULTS: Record<string, string> = {
  siteName: 'eggzec',
  origin: 'https://eggzec.github.io',
  ogImage: 'https://eggzec.github.io/brand/eggzec-banner.png',
  path: '/',
  title: 'eggzec · Science + Computing',
  description:
    'eggzec builds open source scientific computing and automation tools.',
}

const META_RE = /<!--\s*meta:\s*(\{[\s\S]*?\})\s*-->/
const INCLUDE_RE = /<!--\s*@include\s+([\w-]+)\s*-->/g

export function htmlPartials(root: string): Plugin {
  const cache = new Map<string, string>()

  const load = (name: string): string => {
    const cached = cache.get(name)
    if (cached !== undefined) return cached
    const source = readFileSync(resolve(root, 'partials', `${name}.html`), 'utf8')
    cache.set(name, source)
    return source
  }

  return {
    name: 'eggzec:html-partials',
    enforce: 'pre',

    configureServer(server) {
      // Editing a partial should reload every page that includes it.
      server.watcher.add(resolve(root, 'partials'))
      server.watcher.on('change', (file) => {
        if (file.includes(`${'partials'}`)) {
          cache.clear()
          server.ws.send({ type: 'full-reload' })
        }
      })
    },

    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const match = META_RE.exec(html)
        let meta: Record<string, string> = {}

        if (match?.[1]) {
          try {
            meta = JSON.parse(match[1]) as Record<string, string>
          } catch (error) {
            throw new Error(`eggzec:html-partials — invalid meta JSON: ${(error as Error).message}`)
          }
        }

        const values: Record<string, string> = { ...DEFAULTS, ...meta }
        values.canonical = `${values.origin}${values.path}`

        return html.replace(INCLUDE_RE, (_full, name: string) =>
          load(name).replace(/\{\{(\w+)\}\}/g, (_m, key: string) => values[key] ?? ''),
        )
      },
    },
  }
}
