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
    tagline: 'Monte Carlo error propagation in real time using Latin hypercube sampling',
    category: 'Uncertainty',
    github: gh('mcerp'),
    docs: eggzecDocs('mcerp'),
    pypi: 'mcerp',
    icon: 'mcerp.svg',
  },
  {
    name: 'soerp',
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
    tagline: 'Open source risk analysis with predictive modelling and Monte Carlo simulation',
    category: 'Uncertainty',
    github: gh('vatic'),
    pypi: 'vatic',
  },

  // ---- Optimization -----------------------------------------------------
  {
    name: 'pyswarm',
    tagline: 'Particle swarm optimization with a small API for constrained problems without derivatives',
    category: 'Optimization',
    github: gh('pyswarm'),
    docs: eggzecDocs('pyswarm'),
    pypi: 'pyswarm',
    icon: 'pyswarm.svg',
  },
  {
    name: 'pydoe',
    tagline: 'Design of experiments with factorial, response surface, space filling, and optimal designs',
    category: 'Optimization',
    github: 'https://github.com/pydoe/pydoe',
    docs: 'https://pydoe.github.io/pydoe/',
    pypi: 'pydoe',
    icon: 'pydoe.svg',
  },
  {
    name: 'nlpql',
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
    tagline: 'Stochastic Runge-Kutta solvers for scalar Ito SDEs, from Euler-Maruyama upward',
    category: 'Numerics',
    github: gh('sdepack'),
    docs: eggzecDocs('sdepack'),
    pypi: 'sdepack',
    icon: 'sdepack.svg',
  },
  {
    name: 'smolpack',
    tagline: 'Sparse grid cubature over the unit hypercube using Smolyak with Clenshaw-Curtis rules',
    category: 'Numerics',
    github: gh('smolpack'),
    docs: eggzecDocs('smolpack'),
    pypi: 'smolpack',
  },
  {
    name: 'polpack',
    tagline: 'Special functions and polynomial families over a Fortran numerical core',
    category: 'Numerics',
    github: gh('polpack'),
    docs: eggzecDocs('polpack'),
  },
  {
    name: 'kronrod',
    tagline: 'Gauss-Kronrod quadrature rule generator for reusable high accuracy integration',
    category: 'Numerics',
    github: gh('kronrod'),
    docs: eggzecDocs('kronrod'),
  },
  {
    name: 'NULAPACK',
    tagline: 'Numerical linear algebra with Fortran core subroutines and Python and C++ interfaces',
    category: 'Numerics',
    github: 'https://github.com/NULAPACK/NULAPACK',
    docs: 'https://nulapack.github.io/NULAPACK/',
  },
  {
    name: 'sparse_grid',
    display: 'Sparse Grid',
    tagline: 'Hierarchical index generation and fast hat basis evaluation in pure Python',
    category: 'Numerics',
    github: gh('sparse_grid'),
    docs: eggzecDocs('sparse_grid'),
  },
  {
    name: 'spinterp',
    tagline: 'Sparse grid interpolation toolbox',
    category: 'Numerics',
    github: gh('spinterp'),
    docs: eggzecDocs('spinterp'),
  },
  {
    name: 'cordic',
    tagline: 'CORDIC evaluation of trigonometric, hyperbolic, exponential, and root functions',
    category: 'Numerics',
    github: gh('cordic'),
    docs: eggzecDocs('cordic'),
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
  },
]

/** How a project is written in prose and on cards. */
export const projectLabel = (project: Project): string => project.display ?? project.name

/**
 * Featured = the projects with a hand-drawn brand icon. That is the honest
 * signal of which ones we have invested in, and it keeps the landing grid and
 * the nav menu in sync with the icon set automatically.
 */
export const FEATURED = PROJECTS.filter((p) => p.icon)

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
    'A community building open source high performance scientific computing. Numerical cores in Fortran and C++, wrapped for Python, published with docs and CI.',
  github: 'https://github.com/eggzec',
  pypi: 'https://pypi.org/org/eggzec/',
  email: 'm.saud.zahir@gmail.com',
  year: 2026,
} as const

export interface Person {
  slug: string
  name: string
  role: string
  bio: string
  avatar: string
  links: Array<{ label: string; href: string }>
  stack: string[]
}

export const PEOPLE: Person[] = [
  {
    slug: 'saud',
    name: 'M. Saud Zahir',
    role: 'Co-founder & maintainer',
    bio: 'Software engineer working across the full lifecycle: problem formulation, system design, implementation, optimization, and deployment. Experienced interfacing Python with C, C++, and Fortran, and writing directly in each.',
    avatar: 'https://github.com/saudzahirr.png',
    links: [
      { label: 'GitHub', href: 'https://github.com/saudzahirr' },
      { label: 'GitLab', href: 'https://gitlab.com/saudzahirr' },
      { label: 'PyPI', href: 'https://pypi.org/user/saudzahirr/' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/saudzahirr/' },
      { label: 'Email', href: 'mailto:m.saud.zahir@gmail.com' },
    ],
    stack: ['Python', 'C++', 'Java', 'Fortran', 'Qt'],
  },
  {
    slug: 'laraib',
    name: 'M. Laraib Ali',
    role: 'Co-founder & maintainer',
    bio: 'Backend and systems engineer specializing in Python and Go, building reliable services and automation on Linux and containers. Works on distributed systems, PostgreSQL design, and observability through logging, tracing, and metrics.',
    avatar: 'https://github.com/laraibg786.png',
    links: [
      { label: 'GitHub', href: 'https://github.com/laraibg786' },
      { label: 'GitLab', href: 'https://gitlab.com/laraibg786' },
      { label: 'PyPI', href: 'https://pypi.org/user/Laraibg786/' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/m-laraib-ali/' },
      { label: 'Email', href: 'mailto:laraibg786@outlook.com' },
    ],
    stack: ['Python', 'Go', 'PostgreSQL', 'Docker', 'Linux', 'Redis'],
  },
  {
    slug: 'noor',
    name: 'Noor Mustafa',
    role: 'Maintainer',
    bio: 'Java developer focused on reliable backend applications with Spring Boot. Enjoys solving complex problems, learning continuously, and collaborating to deliver clean, maintainable software.',
    avatar: 'https://github.com/Noor-Mustafa123.png',
    links: [
      { label: 'GitHub', href: 'https://github.com/Noor-Mustafa123' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/noormustafa715/' },
    ],
    stack: ['Java', 'Spring', 'Kotlin', 'Nginx', 'Python'],
  },
]
