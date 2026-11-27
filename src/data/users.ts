/**
 * Organisations that build on eggzec packages, one story per organisation.
 *
 *   - `PYDOE_USERS` (users-pydoe.ts) is generated from the "Who uses PyDOE?"
 *     page in the pydoe documentation, and carries that page's wording.
 *   - `EXTRA_USERS` below covers PySwarm and SOERP, from GitHub's dependency
 *     graph for each repository, narrowed to organisations and research groups.
 *     `PLACEMENT` decides where each one sits among the PyDOE stories.
 *   - `MERGED` extends a PyDOE story when the same organisation also uses
 *     another package, so a laboratory appears once with all of its
 *     repositories rather than once per package.
 *
 * Repositories under a personal account are left out: this page lists
 * organisations.
 *
 * Logos under `/brand/users/` are the organisations' own marks, the group's
 * first and its parent institution's after it. `h` is a visual weight on the
 * same 35–84 scale the pydoe page uses: wide wordmarks sit lower than square
 * emblems, so a row of them reads as even.
 */

import { PYDOE_USERS } from './users-pydoe'

export type PackageKey = 'pydoe' | 'pyswarm' | 'mcerp' | 'soerp'

export const PACKAGE_LABEL: Record<PackageKey, string> = {
  pydoe: 'PyDOE',
  pyswarm: 'PySwarm',
  mcerp: 'MCERP',
  soerp: 'SOERP',
}

export interface UserLogo {
  name: string
  src: string
  /** Visual weight, 35–84. */
  h: number
  href: string
}

export interface Testimonial {
  logos: UserLogo[]
  /** Trusted, pre-escaped HTML: <strong>, <em> and <code> only. */
  body: string
  /** `owner/repo` on GitHub. */
  sources: string[]
  packages: PackageKey[]
  /** Stack the logos one per row instead of side by side. */
  stack?: boolean
}

/**
 * Repositories that depend on each package, from GitHub's dependency graph
 * (github-dependents-info, November 2026). Private repositories are counted by
 * GitHub but cannot be listed.
 */
export const DEPENDENTS: Record<PackageKey, { total: number; public: number; url: string }> = {
  pydoe: { total: 1216, public: 573, url: 'https://github.com/pydoe/pydoe/network/dependents' },
  pyswarm: { total: 355, public: 180, url: 'https://github.com/eggzec/pyswarm/network/dependents' },
  mcerp: { total: 25, public: 14, url: 'https://github.com/eggzec/mcerp/network/dependents' },
  soerp: { total: 9, public: 5, url: 'https://github.com/eggzec/soerp/network/dependents' },
}

const avatar = (id: number) => `https://avatars.githubusercontent.com/u/${id}?s=160&v=4`

/**
 * PySwarm users at organisations that already have a PyDOE story. Keyed by the
 * first source repository of that story; the text is appended, the sources and
 * packages are added, and `logos` (when given) replaces the story's logos.
 */
const MERGED: Record<string, Pick<Testimonial, 'body' | 'sources' | 'packages'> & { logos?: UserLogo[] }> = {
  'pnnl/ambrs': {
    logos: [
      { name: 'EMSL', src: '/brand/users/gh-emsl-computing.png', h: 70, href: 'https://www.emsl.pnnl.gov/' },
      { name: 'PNNL', src: '/brand/users/pnnl.jpg', h: 70, href: 'https://www.pnnl.gov/' },
    ],
    body:
      'At the laboratory’s <em>Environmental Molecular Sciences Laboratory</em> (EMSL), <strong>CoreMS</strong> is a Python framework for mass spectrometry of small molecules, covering FT-MS signal processing, molecular formula assignment, GC-MS and LC-MS processing and spectral similarity search, and it builds on <em>PySwarm</em>.',
    sources: ['EMSL-Computing/CoreMS'],
    packages: ['pyswarm'],
  },
  'lanl/bohydra': {
    body:
      'The laboratory’s <strong>impala</strong> toolkit (impala-calib on PyPI) performs modular Bayesian model calibration, exploring posteriors with tempering and adaptive MCMC, and uses <em>PySwarm</em> in its optional <code>map</code> module.',
    sources: ['lanl/impala'],
    packages: ['pyswarm'],
  },
  'NLRWindSystems/WISDEM': {
    body:
      'Floating wind is covered by <strong>FAD-Toolset</strong> (Floating Array Design Toolset), which models and designs arrays of floating offshore structures alongside RAFT, MoorPy and FLORIS and the IEA Wind Task 49 ontology, and builds on <em>PySwarm</em>.',
    sources: ['NLRWindSystems/FAD-Toolset'],
    packages: ['pyswarm'],
  },
}

/** PySwarm and SOERP users. Where each one sits is decided by `PLACEMENT`. */
const EXTRA_USERS: Testimonial[] = [
  {
    logos: [
      { name: 'Curtin University', src: '/brand/users/Curtin_University_Logo.svg', h: 42, href: 'https://www.curtin.edu.au/' },
    ],
    body:
      'Two geochronology tools from the <em>Timescales of Mineral Systems</em> group at <em>Curtin University</em> are built on <em>SOERP</em>. <strong>UPb-Unmixer</strong> accompanies the paper “Unmixing U-Pb ages from core-rim mixtures”, and <strong>LeadLoss</strong> estimates the most likely timing of Pb loss in discordant zircon samples from Tera-Wasserburg or Wetherill ratios with Monte Carlo sampling (Geochemistry, Geophysics, Geosystems, 2025), propagating uncertainty with <em>SOERP</em>.',
    sources: ['Curtin-Timescales-of-Mineral-Systems/UPb-Unmixer', 'Curtin-Timescales-of-Mineral-Systems/LeadLoss'],
    packages: ['soerp'],
  },
  {
    logos: [{ name: 'ICRAR', src: '/brand/users/gh-icrar.png', h: 77, href: 'https://www.icrar.org/' }],
    body:
      'Very large processing graphs for reducing interferometric radio astronomy data are developed, managed and executed with <strong>DALiuGE</strong>, from the <em>International Centre for Radio Astronomy Research</em>. It began as the DFMS prototype for the SKA Science Data Processor consortium, and builds on <em>PySwarm</em>.',
    sources: ['ICRAR/daliuge'],
    packages: ['pyswarm'],
  },
  {
    logos: [
      { name: 'Atomica', src: '/brand/users/gh-atomicateam.png', h: 70, href: 'https://atomica.tools/' },
      {
        name: 'University of Copenhagen',
        src: '/brand/users/University_of_Copenhagen_logo.svg',
        h: 70,
        href: 'https://www.math.ku.dk/',
      },
      { name: 'Burnet Institute', src: '/brand/users/Burnet_Institute_Logo.png', h: 70, href: 'https://www.burnet.edu.au/' },
    ],
    body:
      'Compartmental models of disease epidemics and health-care cascades run on <strong>Atomica</strong>, a simulation engine produced by the <em>Department of Mathematical Sciences</em> at the <em>University of Copenhagen</em> in partnership with the <em>Burnet Institute</em>, with funding from the <em>Bill &amp; Melinda Gates Foundation</em>. It is distributed on PyPI under the MIT licence and builds on <em>PySwarm</em>.',
    sources: ['atomicateam/atomica'],
    packages: ['pyswarm'],
  },
  {
    logos: [
      {
        name: 'Philip Morris International',
        src: '/brand/users/Philip_Morris_International.svg',
        h: 49,
        href: 'https://www.pmi.com/',
      },
    ],
    body:
      '<strong>GOBench</strong>, published by <em>Philip Morris International</em>, is a benchmark suite for global optimization in Python. On test functions forked from SciPy it compares basin hopping, differential evolution, brute force and dual annealing with CMA-ES and <em>PySwarm</em>, whose particle swarm runs as the default <code>PSO</code> and <code>PSO-R</code> methods, and reports the results as a CSV or a heatmap.',
    sources: ['philipmorrisintl/GOBench'],
    packages: ['pyswarm'],
  },
  {
    logos: [{ name: 'OpenWorm', src: '/brand/users/gh-openworm.png', h: 77, href: 'https://openworm.org/' }],
    body:
      'Quantitative Hodgkin-Huxley-style models of the ion channels in <em>C. elegans</em> neurons are built in <strong>ChannelWorm</strong>, an <em>OpenWorm</em> project that digitizes published plots, fits model parameters and exports NeuroML2 models for the c302 network model. It builds on <em>PySwarm</em>.',
    sources: ['openworm/ChannelWorm'],
    packages: ['pyswarm'],
  },
  {
    logos: [
      { name: 'THz Biophotonics Group', src: avatar(261754184), h: 63, href: 'https://www.tuscany-erc.fr/' },
      { name: 'Université de Lille', src: '/brand/users/UniversityOfLille.svg', h: 49, href: 'https://www.univ-lille.fr/' },
    ],
    body:
      'The <em>THz Biophotonics Group</em> at <em>IEMN</em> (CNRS UMR 8520, <em>Université de Lille</em>), home of the ERC TUSCany project, studies biomolecules with terahertz radiation and nanophotonics. Its <strong>Correct-TDS</strong> corrects and statistically analyses time traces from terahertz time-domain spectroscopy (THz-TDS), with a GUI and a scriptable optimization class built on <em>PySwarm</em>.',
    sources: ['THzBiophotonics/Correct-TDS'],
    packages: ['pyswarm'],
  },
  {
    logos: [{ name: 'codecentric', src: '/brand/users/codecentric.webp', h: 42, href: 'https://www.codecentric.de/' }],
    body:
      'The German software consultancy <em>codecentric</em> publishes <strong>maximum-entropy</strong>, the code and data behind its maximum-entropy modelling experiments, which use <em>PySwarm</em> for optimization.',
    sources: ['codecentric/maximum-entropy'],
    packages: ['pyswarm'],
  },
]

/** How many PyDOE stories (NASA, OpenMDAO, Meta, IBM, PayPal) lead the page. */
const LEAD_COUNT = 5

/**
 * Where each extra story goes, by first source repository. `top` follows the
 * lead stories; every other key is the PyDOE story it follows, so universities
 * sit among the other universities and companies among companies.
 */
const PLACEMENT: Record<string, string[]> = {
  top: ['ICRAR/daliuge', 'philipmorrisintl/GOBench'],
  'StanfordVLSI/DaVE': ['Curtin-Timescales-of-Mineral-Systems/UPb-Unmixer'],
  'the-matter-lab/atlas': ['atomicateam/atomica'],
  'eesd-epfl/pareto-optimizer': ['THzBiophotonics/Correct-TDS'],
  'gemseo/gemseo': ['openworm/ChannelWorm'],
  'SWIFTSIM/emulator': ['codecentric/maximum-entropy'],
}

const merge = (story: Testimonial): Testimonial => {
  const extra = MERGED[story.sources[0] ?? '']
  if (!extra) return story
  return {
    logos: extra.logos ?? story.logos,
    body: `${story.body} ${extra.body}`,
    sources: [...story.sources, ...extra.sources],
    packages: [...new Set([...story.packages, ...extra.packages])],
  }
}

/**
 * Stories whose logos read better stacked than side by side, by first source
 * repository: a lab's mark beside its university's wordmark runs too wide here.
 */
const STACKED = new Set([
  'eesd-epfl/pareto-optimizer',
  'QuLab-VU/musyc-web',
  'uvarc/rivanna-docker',
  'wwu-mmll/photonai',
])

const pydoe = PYDOE_USERS.map(merge).map((story) =>
  STACKED.has(story.sources[0] ?? '') ? { ...story, stack: true } : story,
)

const placed = (key: string): Testimonial[] =>
  (PLACEMENT[key] ?? []).map((repo) => {
    const story = EXTRA_USERS.find((s) => s.sources[0] === repo)
    if (!story) throw new Error(`PLACEMENT names ${repo}, which has no story`)
    return story
  })

export const TESTIMONIALS: Testimonial[] = [
  ...pydoe.slice(0, LEAD_COUNT),
  ...placed('top'),
  ...pydoe.slice(LEAD_COUNT).flatMap((story) => [story, ...placed(story.sources[0] ?? '')]),
]

/**
 * Logos for the scrolling strip. One per story: the last logo in a story is
 * the parent institution (a lab is listed before its university), which is the
 * mark a passing reader recognises. Repeats (NC State twice, for example) and
 * GitHub avatars, which are photos as often as marks, are left out.
 */
export const CAROUSEL: Array<UserLogo & { story: string }> = (() => {
  const seen = new Set<string>()
  const logos: Array<UserLogo & { story: string }> = []
  for (const story of TESTIMONIALS) {
    const logo = story.logos[story.logos.length - 1]
    if (!logo || seen.has(logo.src) || logo.src.startsWith('http')) continue
    seen.add(logo.src)
    logos.push({ ...logo, story: storyId(story) })
  }
  return logos
})()

/** A stable in-page anchor for a story: its first source repository. */
export function storyId(story: Testimonial): string {
  return (story.sources[0] ?? '').toLowerCase().replace(/[^a-z0-9]+/g, '-')
}
