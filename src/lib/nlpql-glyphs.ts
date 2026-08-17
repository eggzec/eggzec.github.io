/**
 * Traced from `public/brand/icons/nlpql.svg`.
 *
 * That icon is the mark for the SQP solver, and it is literally what the solver
 * differentiates: the gradient of the Lagrangian. The nabla is one path plus a
 * counter; the script L is a run-merged bitmap, the same construction as the
 * eggzec Block font, so it is kept as its own blocks and written on stroke by
 * stroke rather than filled all at once.
 *
 * Coordinates are the icon's own, and both glyphs share that space, so they can
 * be placed together and stay in register.
 */

/** Nabla outline. Pair with the counter below under an `evenodd` rule. */
export const NABLA_OUTLINE =
  'M4.42 2.40Q4.00 2.40 4.00 2.82L4.00 4.88Q4.00 5.30 4.42 5.30L4.91 5.30Q5.33 5.30 5.33 5.72L5.33 7.78Q5.33 8.20 5.75 8.20L6.25 8.20Q6.67 8.20 6.67 8.62L6.67 10.68Q6.67 11.10 7.09 11.10L7.58 11.10Q8.00 11.10 8.00 11.52L8.00 13.58Q8.00 14.00 8.42 14.00L8.91 14.00Q9.33 14.00 9.33 14.42L9.33 16.48Q9.33 16.90 9.75 16.90L10.25 16.90Q10.67 16.90 10.67 17.32L10.67 19.38Q10.67 19.80 11.09 19.80L12.91 19.80Q13.33 19.80 13.33 19.38L13.33 17.32Q13.33 16.90 13.75 16.90L14.25 16.90Q14.67 16.90 14.67 16.48L14.67 14.42Q14.67 14.00 15.09 14.00L15.58 14.00Q16.00 14.00 16.00 13.58L16.00 11.52Q16.00 11.10 16.42 11.10L16.91 11.10Q17.33 11.10 17.33 10.68L17.33 8.62Q17.33 8.20 17.75 8.20L18.25 8.20Q18.67 8.20 18.67 7.78L18.67 5.72Q18.67 5.30 19.09 5.30L19.58 5.30Q20.00 5.30 20.00 4.88L20.00 2.82Q20.00 2.40 19.58 2.40Z'

/** The hole in the nabla. */
export const NABLA_COUNTER =
  'M9.22 6.60Q8.80 6.60 8.80 7.02L8.80 8.68Q8.80 9.10 9.22 9.10L9.45 9.10Q9.87 9.10 9.87 9.52L9.87 11.18Q9.87 11.60 10.29 11.60L10.51 11.60Q10.93 11.60 10.93 12.02L10.93 13.68Q10.93 14.10 11.35 14.10L12.65 14.10Q13.07 14.10 13.07 13.68L13.07 12.02Q13.07 11.60 13.49 11.60L13.71 11.60Q14.13 11.60 14.13 11.18L14.13 9.52Q14.13 9.10 14.55 9.10L14.78 9.10Q15.20 9.10 15.20 8.68L15.20 7.02Q15.20 6.60 14.78 6.60Z'

/** Nabla bounding box in icon units: `[x, y, width, height]`. */
export const NABLA_BOX = [4, 2.4, 16, 17.4] as const

/** Script L, as `[x, y, width, height]` blocks ordered top to bottom. */
export const SCRIPT_L: ReadonlyArray<readonly [number, number, number, number]> = [
  [17.699, 6.3, 3.257, 1.036],
  [17.699, 6.3, 1.036, 1.777],
  [19.92, 6.3, 1.036, 1.777],
  [16.959, 7.04, 1.777, 1.036],
  [16.959, 7.04, 1.036, 2.517],
  [19.92, 7.04, 1.777, 1.036],
  [20.66, 7.04, 1.036, 1.777],
  [16.218, 7.781, 1.777, 1.036],
  [16.218, 7.781, 1.036, 3.257],
  [20.66, 7.781, 1.036, 1.036],
  [16.218, 8.521, 1.777, 1.036],
  [15.478, 9.261, 1.777, 1.036],
  [15.478, 9.261, 1.036, 3.257],
  [15.478, 10.001, 1.777, 1.036],
  [14.738, 10.742, 1.777, 1.036],
  [14.738, 10.742, 1.036, 3.257],
  [14.738, 11.482, 1.777, 1.036],
  [13.998, 12.222, 1.777, 1.036],
  [13.998, 12.222, 1.036, 3.257],
  [13.998, 12.962, 1.777, 1.036],
  [13.257, 13.703, 1.777, 1.036],
  [13.257, 13.703, 1.036, 3.257],
  [13.257, 14.443, 1.777, 1.036],
  [12.517, 15.183, 1.777, 1.036],
  [12.517, 15.183, 1.036, 1.777],
  [19.179, 15.183, 2.517, 1.036],
  [19.179, 15.183, 1.036, 1.777],
  [11.777, 15.923, 8.439, 1.036],
  [11.777, 15.923, 1.036, 1.777],
  [11.037, 16.664, 1.777, 1.036],
]

/** Corner radius the icon uses on those blocks. */
export const SCRIPT_L_RADIUS = 0.252

/** Script L bounding box in icon units. */
export const SCRIPT_L_BOX = [11.037, 6.3, 10.66, 11.4] as const
