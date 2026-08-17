/**
 * Who builds on these packages.
 *
 * Read off GitHub's dependency graph — the `network/dependents` listing for
 * each repository — then filtered to named organisations and projects and
 * checked against the API one at a time, so every entry here is a repository
 * that really does declare one of ours as a dependency. Individual paper and
 * course repositories are real dependents too, and there are far more of them,
 * but they are not what "used by" is claiming.
 *
 * Only four projects have any dependents at all: pydoe (1,203 dependents), pyswarm, mcerp
 * and soerp. The rest are too new or too specialised to have been picked up,
 * and padding the list would defeat the point of having one.
 *
 * Star counts are a snapshot, taken when this file was generated. They are only
 * used for ordering, so they can drift without the page becoming wrong.
 */

export interface Dependent {
  /** `owner/repo` on GitHub. */
  repo: string
  stars: number
  /** Which of ours it depends on. */
  uses: string[]
}

export const USED_BY: Dependent[] = [
  { repo: 'cmu-db/ottertune', stars: 1232, uses: ['pydoe'] },
  { repo: 'SheffieldML/GPyOpt', stars: 946, uses: ['pydoe'] },
  { repo: 'SMTorg/smt', stars: 905, uses: ['pydoe'] },
  { repo: 'OpenMDAO/OpenMDAO', stars: 771, uses: ['pydoe'] },
  { repo: 'DataCanvasIO/DeepTables', stars: 705, uses: ['pydoe'] },
  { repo: 'EmuKit/emukit', stars: 673, uses: ['pydoe'] },
  { repo: 'SDXorg/pysd', stars: 460, uses: ['pydoe'] },
  { repo: 'SURGroup/UQpy', stars: 362, uses: ['pydoe'] },
  { repo: 'terrapower/armi', stars: 273, uses: ['pydoe'] },
  { repo: 'IBM/simulai', stars: 202, uses: ['pydoe'] },
  { repo: 'MLBazaar/BTB', stars: 176, uses: ['pydoe'] },
  { repo: 'Photon-AI-Research/NeuralSolvers', stars: 173, uses: ['pydoe'] },
  { repo: 'llnl/merlin', stars: 151, uses: ['pydoe'] },
  { repo: 'TemoaProject/temoa', stars: 113, uses: ['pydoe'] },
  { repo: 'llnl/zero-rk', stars: 46, uses: ['pydoe'] },
  { repo: 'nanograv/holodeck', stars: 40, uses: ['pydoe'] },
  { repo: 'gemseo/gemseo', stars: 34, uses: ['pydoe'] },
  { repo: 'paypal/gators', stars: 26, uses: ['pydoe'] },
  { repo: 'nasa/GlennOPT', stars: 25, uses: ['pydoe'] },
  { repo: 'sandialabs/pvOps', stars: 21, uses: ['pydoe'] },
  { repo: 'llnl/merlin-spellbook', stars: 8, uses: ['pydoe'] },
  { repo: 'industrial-optimization-group/pyRVEA', stars: 3, uses: ['pydoe'] },
  { repo: 'lanl/bohydra', stars: 1, uses: ['pydoe'] },
]

/** `owner/repo` split for display — the owner is the name worth showing. */
export const dependentOwner = (d: Dependent): string => d.repo.split('/')[0] ?? d.repo
export const dependentName = (d: Dependent): string => d.repo.split('/')[1] ?? d.repo
