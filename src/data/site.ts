/**
 * Single source of truth for site content.
 *
 * Repository URLs were extracted from the `.git` remotes of the local clones,
 * so they point at the real upstreams — note that a couple of projects live
 * outside the `eggzec` org (pydoe, NULAPACK).
 */

export interface Project {
  /** Repository name — used for URLs and as the display name unless `display` is set. */
  name: string
  /**
   * Human-facing name. Repository naming conventions (snake_case, ALLCAPS)
   * belong on GitHub, not in the interface.
   */
  display?: string
  /** One sentence, present tense, no marketing adjectives. */
  tagline: string
  category: Category
  github: string
  docs?: string
  pypi?: string
  /** Filename under `/brand/icons/`. Having one is what makes a project featured. */
  icon?: string
}

export type Category = 'Uncertainty' | 'Optimization' | 'Numerics' | 'Tooling'

export const CATEGORY_ORDER: Category[] = ['Uncertainty', 'Optimization', 'Numerics', 'Tooling']

export const CATEGORY_BLURB: Record<Category, string> = {
  Uncertainty: 'Propagating error through models by moments, by sampling, or by derivative.',
  Optimization: 'Finding the good point in a design space, and choosing where to sample it.',
  Numerics: 'Quadrature, sparse grids, differential equations, and special functions.',
  Tooling: 'Command line tools and developer infrastructure we needed and could not find.',
}

const gh = (name: string) => `https://github.com/eggzec/${name}`
const eggzecDocs = (name: string) => `https://eggzec.github.io/${name}/`

export const PROJECTS: Project[] = [
  // ---- Uncertainty ------------------------------------------------------
  {
    name: 'mcerp',
    display: 'MCERP',
    tagline: 'Monte Carlo error propagation in real time using Latin hypercube sampling',
    category: 'Uncertainty',
    github: gh('mcerp'),
    docs: eggzecDocs('mcerp'),
    pypi: 'mcerp',
    icon: 'mcerp.svg',
  },
  {
    name: 'soerp',
    display: 'SOERP',
    tagline: 'Second order error propagation that tracks uncertainty through models by moments',
    category: 'Uncertainty',
    github: gh('soerp'),
    docs: eggzecDocs('soerp'),
    pypi: 'soerp',
    icon: 'soerp.svg',
  },
  {
    name: 'ad',
    tagline: 'First and second order automatic differentiation with transparent numeric types',
    category: 'Uncertainty',
    github: gh('ad'),
    docs: eggzecDocs('ad'),
    pypi: 'ad',
    icon: 'ad.svg',
  },
  {
    name: 'vatic',
    display: 'Vatic',
    tagline: 'Open source risk analysis with predictive modelling and Monte Carlo simulation',
    category: 'Uncertainty',
    github: gh('vatic'),
    pypi: 'vatic',
    icon: 'vatic.svg',
  },

  // ---- Optimization -----------------------------------------------------
  {
    name: 'pyswarm',
    display: 'PySwarm',
    tagline: 'Particle swarm optimization with a small API for constrained problems without derivatives',
    category: 'Optimization',
    github: gh('pyswarm'),
    docs: eggzecDocs('pyswarm'),
    pypi: 'pyswarm',
    icon: 'pyswarm.svg',
  },
  {
    name: 'pydoe',
    display: 'PyDOE',
    tagline: 'Design of experiments with factorial, response surface, space filling, and optimal designs',
    category: 'Optimization',
    github: 'https://github.com/pydoe/pydoe',
    docs: 'https://pydoe.github.io/pydoe/',
    pypi: 'pydoe',
    icon: 'pydoe.svg',
  },
  {
    name: 'nlpql',
    display: 'NLPQL',
    tagline: 'Sequential quadratic programming for smooth, constrained nonlinear problems',
    category: 'Optimization',
    github: gh('nlpql'),
    docs: eggzecDocs('nlpql'),
    pypi: 'nlpql',
    icon: 'nlpql.svg',
  },
  {
    name: 'PyOpt',
    tagline: 'Nonlinear constrained optimization behind one interface over several solvers',
    category: 'Optimization',
    github: gh('PyOpt'),
  },

  // ---- Numerics ---------------------------------------------------------
  {
    name: 'sdepack',
    display: 'SDEPack',
    tagline: 'Stochastic Runge-Kutta solvers for scalar Ito SDEs, from Euler-Maruyama upward',
    category: 'Numerics',
    github: gh('sdepack'),
    docs: eggzecDocs('sdepack'),
    pypi: 'sdepack',
    icon: 'sdepack.svg',
  },
  {
    name: 'smolpack',
    display: 'SmolPack',
    tagline: 'Sparse grid cubature over the unit hypercube using Smolyak with Clenshaw-Curtis rules',
    category: 'Numerics',
    github: gh('smolpack'),
    docs: eggzecDocs('smolpack'),
    pypi: 'smolpack',
    icon: 'smolpack.svg',
  },
  {
    name: 'kronrod',
    display: 'Kronrod',
    tagline: 'Gauss-Kronrod quadrature rule generator for reusable high accuracy integration',
    category: 'Numerics',
    github: gh('kronrod'),
    docs: eggzecDocs('kronrod'),
    pypi: 'kronrod',
    icon: 'kronrod.svg',
  },
  {
    name: 'spinterp',
    tagline: 'Sparse grid interpolation toolbox',
    category: 'Numerics',
    github: gh('spinterp'),
    docs: eggzecDocs('spinterp'),
    pypi: 'spinterp',
    icon: 'spinterp.svg',
  },

  // ---- Tooling ----------------------------------------------------------
  {
    name: 'ogrep',
    tagline: 'Search across Office, OpenDocument, JSON, YAML, XML, TOML, and HTML files, in the style of ripgrep',
    category: 'Tooling',
    github: gh('ogrep'),
    icon: 'ogrep.svg',
  },
  {
    name: 'bb',
    tagline: 'Bitbucket Cloud command line client and Python SDK',
    category: 'Tooling',
    github: gh('bb'),
    icon: 'bb.svg',
  },
  {
    name: 'gnspy',
    tagline: 'Typed stubs and scripting documentation for GNS Animator4',
    category: 'Tooling',
    github: gh('gnspy'),
    pypi: 'gnspy',
    icon: 'gnspy.svg',
  },
]

/** How a project is written in prose and on cards. */
export const projectLabel = (project: Project): string => project.display ?? project.name

/**
 * What the landing page leads with, in this order.
 *
 * This used to be derived from which projects had a brand icon. Nearly all of
 * them do now, so that signal stopped selecting anything — a lead set is a
 * decision about what to show a first-time visitor, and it is made here.
 */
const LEAD = ['pydoe', 'ad', 'pyswarm', 'soerp', 'mcerp', 'bb']

export const FEATURED: Project[] = LEAD.map((name) =>
  PROJECTS.find((project) => project.name === name),
).filter((project): project is Project => project !== undefined)

/** The nav dropdown stays short — four, then a link to the full catalog. */
export const NAV_MENU = FEATURED.slice(0, 4)

export interface NavItem {
  label: string
  href: string
  menu?: Project[]
}

export const NAV: NavItem[] = [
  { label: 'Projects', href: '/projects/', menu: NAV_MENU },
  { label: 'Community', href: '/community/' },
]

export const ORG = {
  name: 'eggzec',
  tagline: 'Science + Computing',
  description:
    'A community building open source scientific computing and automation tools, published with documentation and CI.',
  github: 'https://github.com/eggzec',
  pypi: 'https://pypi.org/org/eggzec/',
  email: 'm.saud.zahir@gmail.com',
  year: 2026,
} as const

export interface Person {
  name: string
  role: string
  /** One paragraph, in their own terms. */
  bio: string
  github: string
}

export const PEOPLE: Person[] = [
  {
    name: 'M. Saud Zahir',
    role: 'Co-founder & maintainer',
    bio: 'Software engineer working across the full lifecycle: problem formulation, system design, implementation, optimization, and deployment. Experienced interfacing Python with C, C++, and Fortran, and writing directly in each.',
    github: 'https://github.com/saudzahirr',
  },
  {
    name: 'M. Laraib Ali',
    role: 'Co-founder & maintainer',
    bio: 'Backend and systems engineer specializing in Python and Go, building reliable services and automation on Linux and containers. Works on distributed systems, PostgreSQL design, and observability through logging, tracing, and metrics.',
    github: 'https://github.com/laraibg786',
  },
  {
    name: 'Noor Mustafa',
    role: 'Maintainer',
    bio: 'Java developer focused on reliable backend applications with Spring Boot. Enjoys solving complex problems, learning continuously, and collaborating to deliver clean, maintainable software.',
    github: 'https://github.com/Noor-Mustafa123',
  },
  {
    name: 'Saif ur Rehman',
    role: 'Maintainer',
    bio: 'CAE engineer, researcher, and developer.',
    github: 'https://github.com/saifrehman945',
  },
]
