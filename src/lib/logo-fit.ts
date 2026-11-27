/**
 * Optical size normalisation for organisation logos.
 *
 * Logos arrive in every shape: square seals, 8:1 wordmarks, solid tiles,
 * hairline outlines, and files padded with whitespace. Giving them one height
 * makes wordmarks huge and seals tiny; giving them one width does the reverse.
 * What the eye compares is the area of the artwork and how much ink is in it,
 * so that is what this equalises:
 *
 *   1. Draw the image to a small canvas and find the bounding box of its ink
 *      (anything not transparent and not near-white). That trims padding and
 *      white backgrounds, which would otherwise count as part of the logo.
 *   2. Size that box to a common area. Height falls with aspect ratio as
 *      aspect^-0.42 rather than the constant-area aspect^-0.5, because long
 *      wordmarks still read as smaller than their area suggests.
 *   3. Nudge by ink density: a solid black tile looks heavier than a thin
 *      outline of the same size, so dense marks shrink a little and sparse ones
 *      grow a little.
 *
 * The image sits inside a `.logo-fit` box cut to the ink, offset so the
 * padding falls outside it. Measurements are cached per source, since the
 * carousel shows every logo twice.
 *
 *   <span class="logo-fit" data-fit-base="96" data-fit-max="340"><img …></span>
 *
 * `base` is the edge, in px, of a square logo of average density; `max` caps
 * the width so an extreme wordmark cannot run across the column.
 */

interface Ink {
  /** Ink box as fractions of the image: offset and size. */
  x: number
  y: number
  w: number
  h: number
  /** Width / height of the ink box, in image pixels. */
  aspect: number
  /** Share of the ink box that is ink, 0–1. */
  density: number
}

const SAMPLE = 220
const ASPECT_POWER = 0.42
const REFERENCE_DENSITY = 0.32
const DENSITY_POWER = 0.18

const cache = new Map<string, Ink>()

function naturalSize(img: HTMLImageElement): [number, number] {
  if (img.naturalWidth > 0 && img.naturalHeight > 0) return [img.naturalWidth, img.naturalHeight]
  // An SVG with only a viewBox reports no natural size. Measuring it in a
  // square frame still works: it is drawn centred at its own proportions, and
  // the ink box recovers them.
  return [1, 1]
}

function measureInk(img: HTMLImageElement): Ink {
  const [nw, nh] = naturalSize(img)
  const whole: Ink = { x: 0, y: 0, w: 1, h: 1, aspect: nw / nh, density: REFERENCE_DENSITY }

  const scale = SAMPLE / Math.max(nw, nh)
  const cw = Math.max(1, Math.round(nw * scale))
  const ch = Math.max(1, Math.round(nh * scale))
  const canvas = document.createElement('canvas')
  canvas.width = cw
  canvas.height = ch
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return whole

  let data: Uint8ClampedArray
  try {
    ctx.drawImage(img, 0, 0, cw, ch)
    data = ctx.getImageData(0, 0, cw, ch).data
  } catch {
    // Cross-origin image without CORS: use the whole frame.
    return whole
  }

  let minX = cw
  let minY = ch
  let maxX = -1
  let maxY = -1
  let ink = 0
  for (let y = 0; y < ch; y++) {
    for (let x = 0; x < cw; x++) {
      const i = (y * cw + x) * 4
      const a = data[i + 3]!
      if (a < 28) continue
      if (data[i]! > 236 && data[i + 1]! > 236 && data[i + 2]! > 236) continue
      ink++
      if (x < minX) minX = x
      if (x > maxX) maxX = x
      if (y < minY) minY = y
      if (y > maxY) maxY = y
    }
  }
  if (maxX < 0) return whole

  const bw = maxX - minX + 1
  const bh = maxY - minY + 1
  return {
    x: minX / cw,
    y: minY / ch,
    w: bw / cw,
    h: bh / ch,
    aspect: (bw / cw) * nw / ((bh / ch) * nh),
    density: ink / (bw * bh),
  }
}

function apply(box: HTMLElement, img: HTMLImageElement): void {
  const key = img.currentSrc || img.src
  let ink = cache.get(key)
  if (!ink) {
    ink = measureInk(img)
    cache.set(key, ink)
  }

  const base = Number(box.dataset.fitBase ?? 64)
  const max = Number(box.dataset.fitMax ?? base * 4)

  const weight = Math.min(1.18, Math.max(0.8, (ink.density / REFERENCE_DENSITY) ** -DENSITY_POWER))
  let height = base * ink.aspect ** -ASPECT_POWER * weight
  let width = height * ink.aspect
  if (width > max) {
    width = max
    height = width / ink.aspect
  }

  const imgW = width / ink.w
  const imgH = height / ink.h
  box.style.width = `${width.toFixed(1)}px`
  box.style.height = `${height.toFixed(1)}px`
  img.style.width = `${imgW.toFixed(1)}px`
  img.style.height = `${imgH.toFixed(1)}px`
  img.style.marginLeft = `${(-ink.x * imgW).toFixed(1)}px`
  img.style.marginTop = `${(-ink.y * imgH).toFixed(1)}px`
  box.dataset.fitted = 'true'
}

/** Fit every `.logo-fit` image under `root`, now or when it loads. */
export function mountLogoFit(root: ParentNode = document): void {
  for (const box of root.querySelectorAll<HTMLElement>('.logo-fit')) {
    const img = box.querySelector('img')
    if (!img || box.dataset.fitBound) continue
    box.dataset.fitBound = 'true'
    const run = () => apply(box, img)
    if (img.complete) run()
    else img.addEventListener('load', run, { once: true })
  }
}
