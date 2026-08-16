/**
 * Pointer-driven surface lighting.
 *
 * Two effects, both pure CSS-variable writes so the paint stays on the
 * compositor:
 *
 *   [data-spotlight]  a soft kiwi glow tracking the cursor across a section
 *   [data-tilt]       a few degrees of rotation on hover, springing back
 *
 * Both are skipped entirely on coarse pointers and under reduced motion.
 */

import { animate } from 'motion'
import { isCoarsePointer, prefersReducedMotion } from '../lib/env'

export function mountPointerEffects(root: ParentNode = document): void {
  if (isCoarsePointer() || prefersReducedMotion()) return
  mountSpotlights(root)
  mountTilt(root)
  mountMagnetic(root)
}

function mountSpotlights(root: ParentNode): void {
  for (const host of root.querySelectorAll<HTMLElement>('[data-spotlight]')) {
    let frame = 0
    let x = 0
    let y = 0

    const write = () => {
      frame = 0
      host.style.setProperty('--spot-x', `${x}px`)
      host.style.setProperty('--spot-y', `${y}px`)
    }

    host.addEventListener(
      'pointermove',
      (event) => {
        const rect = host.getBoundingClientRect()
        x = event.clientX - rect.left
        y = event.clientY - rect.top
        if (!frame) frame = requestAnimationFrame(write)
      },
      { passive: true },
    )

    host.addEventListener('pointerenter', () => host.style.setProperty('--spot-opacity', '1'), {
      passive: true,
    })
    host.addEventListener('pointerleave', () => host.style.setProperty('--spot-opacity', '0'), {
      passive: true,
    })
  }
}

function mountTilt(root: ParentNode): void {
  const MAX = 5

  for (const host of root.querySelectorAll<HTMLElement>('[data-tilt]')) {
    const strength = Number(host.dataset.tilt || 1)

    host.addEventListener(
      'pointermove',
      (event) => {
        const rect = host.getBoundingClientRect()
        const px = (event.clientX - rect.left) / rect.width - 0.5
        const py = (event.clientY - rect.top) / rect.height - 0.5
        host.style.setProperty('--tilt-x', `${-py * MAX * strength}deg`)
        host.style.setProperty('--tilt-y', `${px * MAX * strength}deg`)
      },
      { passive: true },
    )

    host.addEventListener(
      'pointerleave',
      () => {
        animate(
          host,
          { '--tilt-x': '0deg', '--tilt-y': '0deg' },
          { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        )
      },
      { passive: true },
    )
  }
}

/** Buttons drift a few pixels toward the cursor before it arrives. */
function mountMagnetic(root: ParentNode): void {
  const PULL = 0.24

  for (const host of root.querySelectorAll<HTMLElement>('[data-magnetic]')) {
    host.addEventListener(
      'pointermove',
      (event) => {
        const rect = host.getBoundingClientRect()
        const dx = event.clientX - (rect.left + rect.width / 2)
        const dy = event.clientY - (rect.top + rect.height / 2)
        host.style.setProperty('--pull-x', `${dx * PULL}px`)
        host.style.setProperty('--pull-y', `${dy * PULL}px`)
      },
      { passive: true },
    )

    host.addEventListener(
      'pointerleave',
      () => {
        animate(
          host,
          { '--pull-x': '0px', '--pull-y': '0px' },
          { type: 'spring', stiffness: 260, damping: 18 },
        )
      },
      { passive: true },
    )
  }
}
