/**
 * Organisations that build on these packages.
 *
 * Most entries were verified against the package manifests on the repository's
 * default branch: a `requirements*.txt`, `setup.py`, `setup.cfg` or
 * `pyproject.toml` that names the package. Entries that only appeared in
 * GitHub's dependents *index* did not survive — that index lags, and several of
 * them had since dropped the dependency or commented it out.
 *
 * The exception is the block marked below, taken from the "Who uses PyDOE?"
 * page in the pydoe documentation. Those repositories no longer declare pyDOE
 * on their default branch, so they are kept on the strength of that page rather
 * than a manifest we can point at today.
 *
 * pyDOE2 and pyDOE3 count as pyDOE: both forks have been merged back and are
 * maintained here, so a manifest naming either one is a pyDOE user.
 *
 * pyswarm is matched on a word boundary so that `pyswarms` — an unrelated
 * package by a different author — never counts.
 *
 * Logos are the organisations' own marks, desaturated and normalised to a single
 * height by `tools/build-user-logos.py`, so the strip stays even and nothing
 * flashes colour while it loads. Orgs whose avatar is a default identicon, a
 * photograph, or an image that turns to mush in greyscale are left off rather
 * than shown badly.
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

  // University research groups.
  {
    login: 'industrial-optimization-group',
    name: 'Multiobjective Optimization Group, University of Jyväskylä',
    repo: 'industrial-optimization-group/pyRVEA',
    uses: 'pyDOE',
  },
  {
    login: 'Curtin-Timescales-of-Mineral-Systems',
    name: 'Timescales of Mineral Systems, Curtin University',
    repo: 'Curtin-Timescales-of-Mineral-Systems/UPb-Unmixer',
    uses: 'soerp',
  },
  { login: 'BGU-AiDnD', name: 'AiDnD, Ben-Gurion University', repo: 'BGU-AiDnD/Debugger', uses: 'pyswarm' },
  { login: 'SeduceProject', name: 'SeDuCe', repo: 'SeduceProject/seduce_ml', uses: 'mcerp' },
  { login: 'atomicateam', name: 'Atomica', repo: 'atomicateam/atomica', uses: 'pyswarm' },
  {
    login: 'AnesthesiaSimulation',
    name: 'Anesthesia Simulation',
    repo: 'AnesthesiaSimulation/Python_Anesthesia_Simulator',
    uses: 'pyswarm',
  },

  // From the "Who uses PyDOE?" page in the pydoe docs. Not currently declared
  // in these repositories' manifests — see the note at the top of this file.
  { login: 'ibm', name: 'IBM', repo: 'ibm/simulai', uses: 'pyDOE' },
  { login: 'paypal', name: 'PayPal', repo: 'paypal/gators', uses: 'pyDOE' },
  { login: 'terrapower', name: 'TerraPower', repo: 'terrapower/armi', uses: 'pyDOE' },
  { login: 'nanograv', name: 'NANOGrav', repo: 'nanograv/holodeck', uses: 'pyDOE' },
]
