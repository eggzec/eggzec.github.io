# eggzec.github.io

The eggzec organization website. Science + Computing.

Live at **https://eggzec.github.io/**.

A hand built static site: Vite and TypeScript, with no UI framework.
Animation uses [Motion](https://motion.dev) plus
[Lenis](https://lenis.darkroom.engineering) for smooth scrolling, and an SVG
build-on of the logo mark for the hero.

## Layout

```
index.html            landing page
404.html              custom not found page
projects/             full project catalog, filterable by category
community/            maintainers
partials/head.html    shared <head>, injected at build time
public/brand/         logo, project icons
src/
  main.ts             single entry, mounts whatever a page contains
  data/site.ts        projects and people. Edit content here
  components/         nav, footer, cards, mark draw, reveals, marquee
  lib/eggzec-block.ts the eggzec Block bitmap display font, as TypeScript
  styles/             tokens, base, layout, components, pages
```

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
```

```bash
npm run build      # typecheck, then emit dist/
npm run preview    # serve the built output
npm run typecheck
```

## Editing content

Almost everything is data rather than markup, and it all lives in
`src/data/site.ts`.

| What | Where |
| --- | --- |
| Projects, taglines, repository and docs and PyPI links | `PROJECTS` |
| Human facing name when the repo name is not one | `display` on a project |
| Which projects lead the landing page | `LEAD` in `src/data/site.ts` |
| Who builds on our packages | `src/data/used-by.ts` |
| Maintainers | `PEOPLE` |
| Nav links | `NAV` |
| Footer links | `COLUMNS` in `src/components/footer.ts` |

`LEAD` names the projects the landing page and the nav menu open with, in
order. That used to be derived from which projects carried a brand icon, but
nearly all of them do now, so it stopped selecting anything — what a first-time
visitor should see first is a decision, not a side effect. The full catalog on
`/projects/` is grouped by category only, with no separate featured block, so no
card appears twice.

Landing page statistics are counted from the catalog at runtime, so the numbers
cannot drift from what is actually listed.

`src/data/used-by.ts` is the one generated file. It comes from GitHub's
dependency graph — the `network/dependents` listing for each repository —
filtered to named organisations and checked one at a time against the API. Only
pydoe, pyswarm, mcerp and soerp have any dependents, so that is what the list
draws on. Regenerate it by hand rather than trusting it to stay current.

## Design

Colours are the Electropop palette on white:

| Role | Colour |
| --- | --- |
| Block fills, buttons, knockouts | Kiwi `#CCFF00` |
| Accent text and links | Violet `#5200FF` |
| Sparks and the byte cells | Magenta `#F900FF` |
| Third accent | Orange `#FF6B00` |

Kiwi is brilliant as a field with black on top of it and illegible as type on
white, so `--accent-fill` and `--accent-text` are separate roles. Violet carries
everything that has to be read.

Display lettering is the eggzec Block bitmap font, rendered as inline SVG at any
size, so there is no font file and no layout shift. Because the font is
monospaced, the hero solves for letter tracking per line, which makes every line
land at the same width and the same cap height.

The hero, the call to action panels, the footer rule and the 404 page draw the
logo mark rather than decorating around it. `src/components/mark-draw.ts` emits
one SVG: stepped violet traces run in from outside the frame and spark where
they meet the silhouette, a stack of kiwi bars grows out from the centre line to
fill the egg, the outline is traced, and the nine magenta byte cells land last.
It is CSS keyframes with a `--i` index per element, so it plays once, holds, and
costs nothing after that. Everything animated respects `prefers-reduced-motion`.

## Deploy

`.github/workflows/deploy.yml` builds the site and publishes to GitHub Pages on
every push to `master`. Pull requests run the typecheck and the build but do not
publish.

Pages must be set to **Settings, then Pages, then Build and deployment, Source:
GitHub Actions** in the repository settings.
