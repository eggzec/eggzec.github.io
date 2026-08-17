/**
 * Organisations that build on these packages.
 *
 * Every entry was verified against GitHub's live dependency graph, one
 * repository at a time: either the SBOM for that repository lists the package,
 * or its manifest on the default branch declares it. Entries that only appeared
 * in the dependents *index* did not survive — that index lags, and several of
 * them had since dropped the dependency or commented it out. Anything that
 * could not be confirmed was left off, however good the name would have looked.
 *
 * Only pydoe and pyswarm have organisational users. mcerp and soerp have
 * dependents, but individuals rather than organisations.
 *
 * Logos are the organisations' own GitHub avatars, desaturated at build time
 * rather than in CSS so the strip stays even and nothing flashes colour while
 * it loads.
 */

export interface Dependent {
  /** GitHub org, and the basename of its logo under `/brand/users/`. */
  login: string
  name: string
  /** The repository the dependency was verified in. */
  repo: string
  uses: string
}

export const USED_BY: Dependent[] = [
  { login: 'nasa', name: 'NASA', repo: 'nasa/GlennOPT', uses: 'pyDOE' },
  { login: 'llnl', name: 'Lawrence Livermore National Laboratory', repo: 'llnl/merlin', uses: 'pyDOE' },
  { login: 'lanl', name: 'Los Alamos National Laboratory', repo: 'lanl/impala', uses: 'pyswarm' },
  { login: 'sandialabs', name: 'Sandia National Laboratories', repo: 'sandialabs/pvOps', uses: 'pyDOE' },
  { login: 'OpenMDAO', name: 'OpenMDAO', repo: 'OpenMDAO/OpenMDAO', uses: 'pyDOE' },
  { login: 'philipmorrisintl', name: 'Philip Morris International', repo: 'philipmorrisintl/GOBench', uses: 'pyswarm' },
  { login: 'cmu-db', name: 'CMU Database Group', repo: 'cmu-db/ottertune', uses: 'pyDOE' },
  { login: 'qubole', name: 'Qubole', repo: 'qubole/uchit', uses: 'pyDOE' },
  { login: 'codecentric', name: 'codecentric', repo: 'codecentric/maximum-entropy', uses: 'pyswarm' },
  { login: 'ICRAR', name: 'ICRAR', repo: 'ICRAR/daliuge', uses: 'pyswarm' },
  { login: 'EMSL-Computing', name: 'EMSL Computing', repo: 'EMSL-Computing/CoreMS', uses: 'pyswarm' },
  { login: 'National-Digital-Twin', name: 'National Digital Twin', repo: 'National-Digital-Twin/NOVA', uses: 'pyswarm' },
  { login: 'gemseo', name: 'GEMSEO', repo: 'gemseo/gemseo', uses: 'pyDOE' },
  { login: 'SMTorg', name: 'SMT', repo: 'SMTorg/smt', uses: 'pyDOE' },
  { login: 'ICB-DCM', name: 'ICB-DCM', repo: 'ICB-DCM/pyPESTO', uses: 'pyswarm' },
  { login: 'openworm', name: 'OpenWorm', repo: 'openworm/ChannelWorm', uses: 'pyswarm' },
  { login: 'wwu-mmll', name: 'Medical Machine Learning Lab', repo: 'wwu-mmll/photonai', uses: 'pyDOE' },
]
