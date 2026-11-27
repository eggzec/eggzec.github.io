/**
 * Generated from the "Who uses PyDOE?" page in the pydoe documentation
 * (docs/users.md). Edit the source page and regenerate, rather than this file.
 */

import type { Testimonial } from './users'

export const PYDOE_USERS: Testimonial[] = [
  {
    "logos": [
      {
        "name": "NASA",
        "src": "/brand/users/nasa.svg",
        "h": 77,
        "href": "https://www.nasa.gov/"
      }
    ],
    "body": "Engineering simulations such as CFD and turbomachinery design are the target of <strong>GlennOPT</strong>, a standalone Python multi-objective optimization tool developed by <em>NASA</em>. Its evolutionary strategies (Differential Evolution and NSGA methods) tolerate failed simulations by giving them a poor objective value, and extra performance parameters beyond the objectives can be tracked and constrained. Every evaluation is recorded, runs restart from a population folder, stuck runs are killed after a timeout, and results export to Tecplot and CSV. For simulation-based optimization, the <code>DOE</code> module samples the evaluation parameters through <em>PyDOE</em>'s <code>lhs</code> (maximin criterion), <code>ccdesign</code>, <code>bbdesign</code> and <code>fullfact</code>.",
    "sources": [
      "nasa/GlennOPT"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "OpenMDAO",
        "src": "/brand/users/openmdao.png",
        "h": 49,
        "href": "https://openmdao.org/"
      }
    ],
    "body": "Developed by <em>NASA Glenn Research Center</em>, <strong>OpenMDAO</strong> is an open-source, high-performance computing platform written in Python for systems analysis and multidisciplinary optimization. Complex coupled models can be decomposed into components that are easier to build and maintain, yet still be solved in a tightly coupled manner with efficient parallel numerical methods. Gradient-based optimization with analytic derivatives over hundreds or thousands of design variables is the main focus, though gradient-free optimization, mixed-integer nonlinear programming and design space exploration are supported as well. Installed with <code>openmdao[doe]</code>, <em>PyDOE</em> backs the DOE case generators (full-factorial via <code>fullfact</code>, generalized subset via <code>gsd</code>, Plackett-Burman and Latin hypercube) and supplies <code>lhs</code> initial populations to the genetic-algorithm and differential-evolution drivers.",
    "sources": [
      "OpenMDAO/OpenMDAO"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "Meta Research",
        "src": "/brand/users/meta.svg",
        "h": 49,
        "href": "https://ai.meta.com/research/"
      }
    ],
    "body": "Widely used for hyperparameter tuning and black-box engineering problems, <strong>Nevergrad</strong> is the gradient-free optimization platform for Python from <em>Meta Research</em>. Evolution strategies, differential evolution, particle swarm, Bayesian optimization and many other derivative-free methods sit behind a single interface such as <code>NGOpt</code>, with support for bounded continuous, discrete and mixed parametrizations.",
    "sources": [
      "facebookresearch/nevergrad"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "IBM",
        "src": "/brand/users/ibm.svg",
        "h": 63,
        "href": "https://www.ibm.com/"
      }
    ],
    "body": "For <em>physics-informed machine learning</em>, <em>IBM</em>'s open-source <strong>SimulAI</strong> toolkit, published on PyPI as simulai-toolkit, offers data-driven Python pipelines. Physics-Informed Neural Networks (PINNs), DeepONets and autoencoders are combined for scientific computing and reduced-order modeling, so that surrogate models of physical systems can be built, trained and evaluated in one framework. The intent is to unify state-of-the-art machine-learning techniques for physical systems in a single toolkit.",
    "sources": [
      "ibm/simulai"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "Paypal",
        "src": "/brand/users/paypal.svg",
        "h": 84,
        "href": "https://www.paypal.com/"
      }
    ],
    "body": "Model building with big data and fast real-time pre-processing, even for a large number of QPS and using only Python, is what the <em>PSP Data Team</em> at <em>PayPal</em> built <strong>Gators</strong> to handle. This data preprocessing and feature engineering library sits on top of Polars and offers 108 preprocessing transformers across 11 categories behind a scikit-learn-style <code>fit</code>/<code>transform</code> API, with pipeline support and ONNX export for low-latency inference. Benchmarks show it faster than scikit-learn and feature-engine on common preprocessing tasks, and the same code can move from notebook to production.",
    "sources": [
      "paypal/gators"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "LLNL",
        "src": "/brand/users/llnl.svg",
        "h": 42,
        "href": "https://www.llnl.gov/"
      }
    ],
    "body": "<strong>Merlin</strong>, from <em>Lawrence Livermore National Laboratory</em>, is a distributed task-queuing tool for machine-learning-based HPC workflows that scale to very large simulation ensembles (100 million runs on the Sierra supercomputer), producing data sets big enough to train neural-network surrogates for design optimization and uncertainty quantification. Two other laboratory codes call <em>PyDOE</em>. Utilities for Merlin workflows come from <strong>Merlin-Spellbook</strong>, whose sample generator draws parameter samples on the unit hypercube with <code>lhs</code>, <code>star</code> and <code>ccdesign</code> (face-centered, circumscribed and inscribed). <strong>Zero-RK</strong> (Zero Order Reaction Kinetics) cuts the simulation time of chemically reacting systems by orders of magnitude with sparse, preconditioned, adaptive matrix methods, and in its diesel surrogate-optimizer example <code>lhs</code> picks the starting species compositions.",
    "sources": [
      "llnl/merlin",
      "llnl/zero-rk",
      "llnl/merlin-spellbook"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "LANL",
        "src": "/brand/users/lanl.svg",
        "h": 49,
        "href": "https://www.lanl.gov/"
      }
    ],
    "body": "Parallel, multi-fidelity Bayesian optimization with serial and MPI-enabled asynchronous workflows is the job of <strong>Bohydra</strong> (\"many heads, one optimizer\"), a package from <em>Los Alamos National Laboratory</em>. Single- and multi-fidelity Gaussian-process emulators, Bayesian optimization with Expected Improvement and constrained optimization with probabilistic feasibility weighting are included, together with an MPI coordinator/worker pattern for asynchronous runs and SLURM helper templates for HPC clusters. The initial design of the Bayesian-optimization loop comes from <code>lhs</code> in <em>PyDOE</em>, set to the maximin criterion, which both the MPI coordinator and the SLURM initialization template call.",
    "sources": [
      "lanl/bohydra"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "National Laboratory of the Rockies",
        "src": "/brand/users/nlr.svg",
        "h": 42,
        "href": "https://www.nrel.gov/"
      }
    ],
    "body": "At the <em>National Laboratory of the Rockies</em> (formerly the <em>National Renewable Energy Laboratory</em>, NREL), wind-energy systems engineering is done with <strong>WISDEM</strong> (<strong>W</strong>ind-Plant <strong>I</strong>ntegrated <strong>S</strong>ystem <strong>D</strong>esign and <strong>E</strong>ngineering <strong>M</strong>odel). This OpenMDAO-based family of models estimates overall wind-plant cost of energy from turbine and plant cost, energy production and financial models, with modules for rotor, tower, drivetrain, floating-platform and balance-of-system design, and couples them for multidisciplinary design optimization and cost analysis. When its NSGA-II optimization driver starts, the initial population of design variables within their bounds is generated by <code>lhs</code> from <em>PyDOE</em>.",
    "sources": [
      "NLRWindSystems/WISDEM"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "SNL",
        "src": "/brand/users/sandia.svg",
        "h": 63,
        "href": "https://www.sandia.gov/"
      }
    ],
    "body": "<em>Sandia National Laboratories</em> publishes <strong>pvOps</strong>, a Python package for empirical analysis of photovoltaic (PV) field data. Text-based maintenance logs are fused with time-series production data through modules for text processing, text-to-time-series mapping, time-series analysis and current-voltage (IV) curves, and example datasets and tutorials are included. The IV-curve simulator builds Latin hypercube designs over its input features with <em>PyDOE</em>'s <code>lhs</code>.",
    "sources": [
      "sandialabs/pvOps"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "Analytics and AI Methods at Scale",
        "src": "/brand/users/ornl-aaims.png",
        "h": 84,
        "href": "https://www.olcf.ornl.gov/about-olcf/staff-sections/advanced-technologies/ai-analytics-scalable-methods/"
      },
      {
        "name": "Oak Ridge National Laboratory",
        "src": "/brand/users/ornl.png",
        "h": 56,
        "href": "https://www.ornl.gov/"
      }
    ],
    "body": "\"Entropy-driven Optimal Sub-sampling of Fluid Dynamics for Developing Machine-learned Surrogates\" is the paper behind <strong>DataSiftML</strong>, developed by the <em>Analytics and AI Methods at Scale</em> group of the Oak Ridge Leadership Computing Facility at <em>Oak Ridge National Laboratory</em>. The code sub-samples CFD simulation data, such as an OpenFOAM flow-around-a-cylinder case, into compact training sets for machine-learned surrogate models, choosing among maximum-entropy, random, cluster-based and kNN strategies.",
    "sources": [
      "at-aaims/DataSiftML"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "PNNL",
        "src": "/brand/users/pnnl.jpg",
        "h": 70,
        "href": "https://www.pnnl.gov/"
      }
    ],
    "body": "<em>PyDOE</em> appears in three projects at <em>Pacific Northwest National Laboratory</em>. <strong>AMBRS</strong> is a Python workflow that runs a curated set of aerosol box models (PartMC and MAM4) so that their parameterizations can be compared systematically, and its <code>lhs</code> routine builds perturbed-parameter ensembles from an ensemble specification by calling <em>PyDOE</em>'s <code>lhs</code>. Efficient training of physics-informed machine-learning models, with self-adaptive weighting and sampling, is the purpose of the PyTorch library <strong>ET-PINN</strong>, whose geometry sampler offers <code>lhs</code> alongside Halton sequences for generating training points. That same <code>lhs</code>-based sampler serves <strong>ArGEnT</strong>, an arbitrary-geometry-encoded transformer for operator learning, which also draws <code>lhs</code> point clouds to represent geometries in its laminar-airfoil, lid-driven and rod examples.",
    "sources": [
      "pnnl/ambrs",
      "pnnl/ET-PINN",
      "pnnl/ArGEnT"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "POptUS",
        "src": "/brand/users/anl-poptus.png",
        "h": 84,
        "href": "https://github.com/POptUS"
      },
      {
        "name": "Argonne National Laboratory",
        "src": "/brand/users/anl.svg",
        "h": 56,
        "href": "https://www.anl.gov/"
      }
    ],
    "body": "Simulation-based optimization software from <em>Argonne National Laboratory</em> and <em>Inria</em> is hosted under <em>POptUS</em> (<strong>P</strong>ractical <strong>Opt</strong>imization <strong>U</strong>sing <strong>S</strong>tructure). One of its repositories, <strong>StochDFO</strong>, collects algorithms for stochastic derivative-free optimization and currently consists of the OGPIT tool: Python sources that run in parallel with mpi4py and take their test problems from the BenDFO collection. OGPIT's hetGPy-based module calls <em>PyDOE</em>'s <code>lhs</code> (imported as <code>lhspy</code>) with the maximin criterion, both to build the initial design of its Gaussian-process-based search and to generate candidate points inside the current trust region.",
    "sources": [
      "POptUS/StochDFO"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "Lawrence Berkeley National Laboratory",
        "src": "/brand/users/lbnl.svg",
        "h": 49,
        "href": "https://www.lbl.gov/"
      }
    ],
    "body": "Dynamic facades such as electrochromic windows, blinds and shades, together with lighting and HVAC systems, are controlled by <strong>AFC</strong> (<strong>A</strong>dvanced <strong>F</strong>acade <strong>C</strong>ontroller), a model-predictive control package from the <em>Windows Group</em> in the <em>Energy Technologies Area</em> of <em>Lawrence Berkeley National Laboratory</em>. Using weather forecasts and room and floor temperature measurements, it optimizes setpoints over a horizon of typically 24 hours to minimize electricity cost and/or emissions while accounting for visual and thermal comfort (glare, daylight, view). The package builds on LBNL's DOPER and FMLC frameworks. So that model-parameter tuning can run from multiple starting points, its <code>rctuning</code> optimizer draws starting parameter sets with <em>PyDOE</em>'s <code>lhs</code>.",
    "sources": [
      "LBNL-ETA/AFC"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "Agile BioFoundry",
        "src": "/brand/users/agile-biofoundry.png",
        "h": 84,
        "href": "https://agilebiofoundry.org/"
      }
    ],
    "body": "Alongside its multiomics paper, the <em>Agile BioFoundry</em>, a consortium of U.S. Department of Energy national laboratories for synthetic biology and biomanufacturing, publishes a companion repository. Jupyter notebooks there combine <strong>ICE</strong>, <strong>OMG</strong>, <strong>EDD</strong> and <strong>ART</strong> to store strain information, generate mock omics data, store experiment data and let machine learning suggest new experiments. Working together on a simulated data set, the tools pinpoint genetic modifications that improve production of isoprenol, a potential biofuel.",
    "sources": [
      "AgileBioFoundry/multiomicspaper"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "DIANA-HEP",
        "src": "/brand/users/diana-hep.svg",
        "h": 42,
        "href": "https://diana-hep.org/"
      },
      {
        "name": "Princeton University",
        "src": "/brand/users/princeton-university.svg",
        "h": 56,
        "href": "https://www.princeton.edu/"
      },
      {
        "name": "University of Cincinnati",
        "src": "/brand/users/university-of-cincinnati.svg",
        "h": 70,
        "href": "https://www.uc.edu/"
      },
      {
        "name": "New York University",
        "src": "/brand/users/new-york-university.svg",
        "h": 49,
        "href": "https://www.nyu.edu/"
      },
      {
        "name": "University of Nebraska-Lincoln",
        "src": "/brand/users/university-of-nebraska-lincoln.svg",
        "h": 63,
        "href": "https://www.unl.edu/"
      },
      {
        "name": "CERN",
        "src": "/brand/users/cern.svg",
        "h": 77,
        "href": "https://home.cern/"
      }
    ],
    "body": "Estimating excursion sets (iso-surfaces) of one or many expensive black-box functions, such as the exclusion contours of high-energy physics searches computed from costly Monte Carlo simulations, is what <strong>excursion</strong> does efficiently with Gaussian-process-based Bayesian optimization. This package comes from <em>DIANA-HEP</em> (<em>Data-Intensive Analysis for High Energy Physics</em>), and points in its Latin hypercube sampler module are drawn with <em>PyDOE</em>'s <code>lhs</code>. Funded by the NSF Software Infrastructure for Sustained Innovation (SI2) program, the DIANA-HEP project brought together <em>Princeton University</em>, the <em>University of Cincinnati</em>, <em>New York University</em> and the <em>University of Nebraska-Lincoln</em>. It builds tools that help experiments at CERN's Large Hadron Collider and other facilities acquire, reduce and analyze petabytes of data.",
    "sources": [
      "diana-hep/excursion"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "NEASQC",
        "src": "/brand/users/neasqc.svg",
        "h": 56,
        "href": "https://www.neasqc.eu/"
      },
      {
        "name": "European Commission",
        "src": "/brand/users/european-commission.svg",
        "h": 56,
        "href": "https://cordis.europa.eu/project/id/951821"
      }
    ],
    "body": "Coordinated by <em>Atos</em>, the European Horizon 2020 project <em>NEASQC</em> (<strong>NE</strong>xt <strong>A</strong>pplication<strong>S</strong> of <strong>Q</strong>uantum <strong>C</strong>omputing) brings together 12 companies and research labs to build industrial applications for near-term quantum computers. <strong>WP6_QNLP</strong>, the repository of work package 6.1, is a benchmarking solution for quantum natural language processing that pre-processes data and trains and evaluates quantum and classical NLP models for text classification. Work package 3 hosts <strong>TNBS</strong> (The NEASQC Benchmark Suite), with myQLM-compatible implementations of benchmark test cases for probability loading, amplitude estimation, phase estimation and parent-Hamiltonian kernels.",
    "sources": [
      "NEASQC/WP6_QNLP",
      "NEASQC/WP3_Benchmark"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "DESNZ",
        "src": "/brand/users/desnz.svg",
        "h": 84,
        "href": "https://www.gov.uk/government/organisations/department-for-energy-security-and-net-zero"
      }
    ],
    "body": "How much renewable generation and storage an energy system needs is the question behind <strong>SCORES</strong> (<strong>S</strong>torage and <strong>C</strong>ost <strong>O</strong>ptimisation for <strong>R</strong>enewable <strong>E</strong>nergy <strong>S</strong>ystems), developed by the <em>SICE</em> team under the UK <em>Department for Energy Security and Net Zero</em>. The model compares archival weather data, from hourly MERRA-2 and ERA5 satellite data across a range of weather years, with demand data to predict how much electricity storage is needed. Before optimising the system to meet a specified reliability requirement, the routines in <code>system.py</code> search over generator capacity ratios with <em>PyDOE</em>'s <code>lhs</code> to find a good starting set of generation capacities.",
    "sources": [
      "DESNZ-SICE/SCORES"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "PIK copan",
        "src": "/brand/users/pik-copan.png",
        "h": 63,
        "href": "https://www.pik-potsdam.de/copan"
      },
      {
        "name": "Potsdam Institute for Climate Impact Research",
        "src": "/brand/users/pik.png",
        "h": 63,
        "href": "https://www.pik-potsdam.de/en"
      }
    ],
    "body": "Tipping cascades on complex networks can be simulated with <strong>pycascades</strong>, a Python framework from the <em>copan</em> (Coevolutionary Pathways) collaboration at the <em>Potsdam Institute for Climate Impact Research</em>. It offers tipping elements with cusp or Hopf bifurcations, arbitrary networks plus ready-made Erdős-Rényi, Barabási-Albert and Watts-Strogatz topologies, and optional stochastic forcing such as Gaussian noise or Lévy and Cauchy processes. Examples include the Amazon rainforest moisture-recycling network, interacting climate tipping elements and the global trade network. For the earth-system case, the <code>lhs_preparator</code> script calls <em>PyDOE</em>'s <code>lhs</code> for 1,000 Latin hypercube samples over 11 parameters.",
    "sources": [
      "pik-copan/pycascades"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "PSNC QCG",
        "src": "/brand/users/psnc-qcg.png",
        "h": 84,
        "href": "https://github.com/psnc-qcg"
      },
      {
        "name": "PSNC",
        "src": "/brand/users/psnc.svg",
        "h": 35,
        "href": "https://www.psnc.pl/"
      }
    ],
    "body": "Learning, using and benchmarking different quantum algorithms, hardware and problem formulations becomes simpler with Quantum Launcher, the high-level Python library that the <em>Poznań Supercomputing and Networking Center</em> publishes as <strong>QCG-QuantumLauncher</strong> within its QCG tooling for quantum computing. A run is split into a problem (such as MaxCut or Exact Cover), an algorithm (such as QAOA, FALQON or BBS) and a backend (quantum hardware or a local simulator), with predefined sets of each, automated problem processing and an asynchronous architecture for standalone or grid execution.",
    "sources": [
      "psnc-qcg/QCG-QuantumLauncher"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "IDM",
        "src": "/brand/users/idm.jpg",
        "h": 49,
        "href": "https://idmod.org/"
      }
    ],
    "body": "The <em>Institute for Disease Modeling</em> (Gates Foundation) builds its sub-national tailoring (SNT) workflow, <strong>emodpy-snt</strong>, on the EMOD malaria transmission model. Collected there are the core scripts shared across SNT projects: preparing demographic, vector and intervention inputs, clustering administrative regions by seasonality and transmission intensity, calibrating each region against survey prevalence data, and simulating past and future intervention scenarios. Python and R scripts are combined with post-processing and validation steps. When simulation sweeps are set up, Latin hypercube parameter samples for individual districts are drawn with <em>PyDOE</em>'s <code>lhs</code>.",
    "sources": [
      "InstituteforDiseaseModeling/emodpy-snt"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "NANOGrav",
        "src": "/brand/users/nanograv.png",
        "h": 63,
        "href": "https://nanograv.org/"
      }
    ],
    "body": "Massive black-hole binary population synthesis for gravitational-wave calculations is the domain of <strong>Holodeck</strong>, an astrophysics package developed by <em>NANOGrav</em>. Synthetic populations of supermassive black-hole binaries are built from semi-analytic models, cosmological hydrodynamic simulations and observationally derived galaxy-merger catalogs, for gravitational-wave background studies and related analyses. Stable versions are distributed on PyPI as holodeck-gw. When its library-generation scripts choose the parameters of semi-analytic model populations, they can use either of two Latin hypercube sampling backends, <em>PyDOE</em> or SciPy.",
    "sources": [
      "nanograv/holodeck"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "PISM",
        "src": "/brand/users/uaf-pism.png",
        "h": 56,
        "href": "https://www.pism.io/"
      },
      {
        "name": "University of Alaska Fairbanks",
        "src": "/brand/users/university-of-alaska-fairbanks.svg",
        "h": 49,
        "href": "https://www.uaf.edu/"
      }
    ],
    "body": "Under a NASA ROSES award, the <em>Parallel Ice Sheet Model</em> (PISM) team at the <em>University of Alaska Fairbanks</em> develops <strong>pism-ragis</strong>, a reanalysis of the Greenland Ice Sheet (RAGIS). Its data-assimilation framework combines sparse observations with the PISM ice sheet model to reconstruct the state of the ice sheet from 1980 to 2020 using probabilistic filtering methods, with runs carried out on HPC systems. In the uncertainty-quantification scripts the default sampler is <em>PyDOE</em>'s <code>lhs</code> (via pyDOE3), which draws Latin hypercube samples of the prior parameter distributions for the ensemble.",
    "sources": [
      "pism/pism-ragis"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "MIT PV-Lab",
        "src": "/brand/users/mit-pv-lab.jpg",
        "h": 77,
        "href": "https://pv.mit.edu/"
      },
      {
        "name": "Massachusetts Institute of Technology",
        "src": "/brand/users/mit.svg",
        "h": 63,
        "href": "https://www.mit.edu/"
      }
    ],
    "body": "<strong>GPyOpt_DFT</strong>, from the <em>Accelerated Materials Laboratory for Sustainability</em> (PV-Lab) at the <em>Massachusetts Institute of Technology</em>, is a fork of GPyOpt that adds a DFT-constrained acquisition function (EI_DFT) for physics-constrained Bayesian optimization of ternary MAPbI/FAPbI/CsPbI perovskite mixtures. The Latin hypercube initial design of its optimization loop is built with <em>PyDOE</em>'s <code>lhs</code>, and the lab also uses <em>PyDOE</em> in <strong>BOBartender</strong>. Within the <em>Data to AI Lab</em>'s <strong>ML Bazaar</strong> project sits <strong>BTB</strong> (<strong>B</strong>ayesian <strong>T</strong>uning and <strong>B</strong>andits), a simple, extensible backend for auto-tuning and model-selection systems such as AutoML systems.",
    "sources": [
      "PV-Lab/GPyOpt_DFT",
      "MLBazaar/BTB"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "Stanford VLSI Research Group",
        "src": "/brand/users/stanford-vlsi.png",
        "h": 77,
        "href": "https://www-vlsi.stanford.edu/"
      },
      {
        "name": "Stanford University",
        "src": "/brand/users/stanford-university.svg",
        "h": 42,
        "href": "https://www.stanford.edu/"
      }
    ],
    "body": "Mixed-signal systems-on-chip are validated through analog functional modeling in <strong>DaVE</strong>, a set of methodologies and tools from the <em>Stanford VLSI Research Group</em>: <strong>mLingua</strong> covers event-driven piecewise-linear models in SystemVerilog, <strong>mProbo</strong> checks that analog models match their transistor-level circuits, and <strong>mGenero</strong> handles model generation. Latin hypercube test vectors for comparing models against circuits come from <em>PyDOE</em>'s <code>lhs</code> in the model checker. Also at <em>Stanford University</em>, the <em>Eddy</em> atmospheric-dynamics group's <strong>QBO-History-Matching</strong> calibrates the AD99 gravity-wave parameterization in the MiMA climate model against the Quasi-Biennial Oscillation, starting from an initial Latin hypercube sample of the parameter space.",
    "sources": [
      "StanfordVLSI/DaVE",
      "Eddy-Stanford/QBO-History-Matching"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "Tsinghua FIB Lab",
        "src": "/brand/users/tsinghua-fib-lab.svg",
        "h": 70,
        "href": "http://fi.ee.tsinghua.edu.cn/"
      },
      {
        "name": "Tsinghua University",
        "src": "/brand/users/tsinghua-university.svg",
        "h": 84,
        "href": "https://www.tsinghua.edu.cn/en/"
      }
    ],
    "body": "\"Modeling User Fatigue for Sequential Recommendation\", a SIGIR 2024 paper from the <em>FIB Lab</em> at <em>Tsinghua University</em>, is officially implemented in <strong>FRec</strong>. Built on Microsoft Recommenders and TensorFlow, the code trains the FRec sequential recommender on a Taobao dataset and includes the CLSR and SLiRec baselines for comparison.",
    "sources": [
      "tsinghua-fib-lab/SIGIR24-FRec"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "PKU DAIR Lab",
        "src": "/brand/users/pku-dair.svg",
        "h": 84,
        "href": "https://github.com/PKU-DAIR"
      },
      {
        "name": "Peking University",
        "src": "/brand/users/peking-university.svg",
        "h": 84,
        "href": "https://www.pku.edu.cn/"
      }
    ],
    "body": "Database knobs are the focus of two tools from the <em>Data and Intelligence Research (DAIR) Lab</em> at <em>Peking University</em>. <strong>DBTune</strong> (VLDB'22) is a configuration tuning system that automatically finds good knob settings for performance, resource-oriented or multi-objective tuning, covering knob selection, configuration tuning and transfer learning from past tasks, while its companion <strong>KnobsTuningEA</strong> is an experimental evaluation of knob-tuning methods with a surrogate-based benchmark. In both, knob configurations across the configuration space are sampled by maximin-criterion <code>lhs</code> from <em>PyDOE</em>. The university's <em>Yue Yang group</em> develops <strong>QKoopman</strong>, a data-driven quantum Koopman method that combines deep learning and quantum algorithms to simulate nonlinear dynamics such as reaction-diffusion systems and 2D turbulence.",
    "sources": [
      "PKU-DAIR/DBTune",
      "PKU-DAIR/KnobsTuningEA",
      "YYgroup/QKoopman"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "SURG",
        "src": "/brand/users/jhu-surg.jpg",
        "h": 49,
        "href": "https://sites.google.com/site/jhusurg/"
      }
    ],
    "body": "Michael D. Shields directs <em>SURGroup</em>, which develops <strong>UQpy</strong> (<strong>U</strong>ncertainty <strong>Q</strong>uantification with <strong>Py</strong>thon), a general-purpose Python toolbox for modeling uncertainty in physical and mathematical systems. Used in engineering and scientific contexts, it implements sampling, uncertainty propagation, surrogate models and sensitivity analysis. In the stratified-sampling module, the seeds of rectangular strata are placed on a full factorial grid by a <code>fullfact</code> routine adapted from <em>PyDOE</em>.",
    "sources": [
      "SURGroup/UQpy"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "The Matter Lab",
        "src": "/brand/users/toronto-matter-lab.png",
        "h": 63,
        "href": "https://www.matter.toronto.edu/"
      },
      {
        "name": "University of Toronto",
        "src": "/brand/users/university-of-toronto.svg",
        "h": 63,
        "href": "https://www.utoronto.ca/"
      }
    ],
    "body": "Self-driving laboratories need a brain, or experiment planner, and <strong>Atlas</strong> is meant to fill that role. The <em>Matter Lab</em> at the <em>University of Toronto</em> built this Python package for Bayesian optimization in the experimental sciences with the <em>Vector Institute</em>, on GPyTorch and BoTorch; it handles categorical and mixed parameter spaces as well as multi-objective, noisy, constrained, multi-fidelity and meta-learning optimization. At the same university, <em>Rotman FinHub</em> develops <strong>deep-macrofin</strong>, a deep-learning framework for solving continuous-time equilibrium models in macroeconomics and finance, whose initial example scripts import <code>lhs</code> from <em>PyDOE</em> for sampling.",
    "sources": [
      "the-matter-lab/atlas",
      "rotmanfinhub/deep-macrofin"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "CMU Database Group",
        "src": "/brand/users/cmu-database-group.png",
        "h": 49,
        "href": "https://db.cs.cmu.edu/"
      },
      {
        "name": "CASOS IDeaS Center",
        "src": "/brand/users/cmu-casos-ideas.jpg",
        "h": 84,
        "href": "https://github.com/CASOS-IDeaS-CMU"
      },
      {
        "name": "CoAx Lab",
        "src": "/brand/users/cmu-coax-lab.png",
        "h": 70,
        "href": "https://github.com/CoAxLab"
      },
      {
        "name": "Carnegie Mellon University",
        "src": "/brand/users/carnegie-mellon-university.png",
        "h": 35,
        "href": "https://www.cmu.edu/"
      }
    ],
    "body": "Machine learning drives <strong>OtterTune</strong>, the <em>Carnegie Mellon University Database Group</em>'s tool for automatically finding good settings for a database management system's configuration knobs, and training data from previous tuning sessions is reused along the way. When a session has too little data for its models, or runs in LHS mode, knob configurations are generated by <em>PyDOE</em>'s <code>lhs</code> with the maximin criterion. Elsewhere at CMU, the <em>CASOS IDeaS Center</em> maintains misinformation-source detection code, the <em>CoAx Lab</em> draws initial parameter sets with <code>lhs</code> in <strong>RADD</strong> to fit decision models to behavioral data, and the <em>MARS</em> project builds <strong>model-learner</strong>, its intent-discovery module.",
    "sources": [
      "cmu-db/ottertune",
      "CASOS-IDeaS-CMU/Detection-and-Discovery-of-Misinformation-Sources",
      "CoAxLab/radd",
      "cmu-mars/model-learner"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "IHME",
        "src": "/brand/users/ihme.jpg",
        "h": 70,
        "href": "https://www.healthdata.org/"
      },
      {
        "name": "University of Washington",
        "src": "/brand/users/university-of-washington.svg",
        "h": 49,
        "href": "https://www.washington.edu/"
      }
    ],
    "body": "Public-health microsimulation models at the <em>Institute for Health Metrics and Evaluation</em> (University of Washington) are built as <strong>Vivarium</strong> models. One such research repository, <strong>vivarium_gates_lsff</strong>, holds model specifications, simulation and results tooling, and data artifacts for Uganda and the United Republic of Tanzania. The institute runs several other Vivarium projects as well.",
    "sources": [
      "ihmeuw/vivarium_gates_lsff"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "QUEENS",
        "src": "/brand/users/queens.svg",
        "h": 77,
        "href": "https://queens-py.github.io/queens/"
      },
      {
        "name": "Technical University of Munich",
        "src": "/brand/users/technical-university-of-munich.svg",
        "h": 63,
        "href": "https://www.tum.de/en/"
      }
    ],
    "body": "With the <em>Institute for Computational Mechanics</em> at the <em>Technical University of Munich</em>, a Python framework called <strong>QUEENS</strong> (<strong>Q</strong>uantification of <strong>U</strong>ncertain <strong>E</strong>ffects in <strong>En</strong>gineering <strong>S</strong>ystems) was developed for solver-independent multi-query analyses of large-scale computational models. Parameter studies, sensitivity analysis, surrogate modeling, uncertainty quantification and Bayesian inverse analysis are all covered, and a modular architecture for parallel model queries scales from a laptop to an HPC cluster. The Latin hypercube sampling iterator first generates samples in the unit hypercube with <em>PyDOE</em>'s <code>lhs</code>, then maps them to the model's input distributions.",
    "sources": [
      "queens-py/queens"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "The University of Tokyo",
        "src": "/brand/users/university-of-tokyo.svg",
        "h": 49,
        "href": "https://www.u-tokyo.ac.jp/en/"
      }
    ],
    "body": "Researchers in the <em>Tsuda Laboratory</em> at <em>The University of Tokyo</em> wrote <strong>POPSL</strong>, the official PyTorch implementation of Preference-Optimized Pareto Set Learning (PO-PSL) for black-box multi-objective optimization. Pareto set learning is framed as a bilevel problem: preference vectors are optimized with a differentiable cross-entropy method so that they spread evenly over the Pareto front, while Gaussian processes act as surrogate models. Benchmark problems such as ZDT3, DTLZ2, DTLZ5 and RE5 ship with the code.",
    "sources": [
      "tsudalab/POPSL"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "EPCC",
        "src": "/brand/users/edinburgh-epcc.png",
        "h": 63,
        "href": "https://www.epcc.ed.ac.uk/"
      },
      {
        "name": "University of Edinburgh",
        "src": "/brand/users/university-of-edinburgh.svg",
        "h": 56,
        "href": "https://www.ed.ac.uk/"
      }
    ],
    "body": "Robust optimisation looks for solutions that stay optimal under perturbations within a disturbance neighbourhood, and <strong>pyrobust</strong> implements such methods in Python. It comes from <em>Prof. Jonathan Fieldsend's group</em> at the <em>University of Exeter</em> together with <em>EPCC</em>, the supercomputing centre of the <em>University of Edinburgh</em>, and its core methods exploit the population's search history and resample the best individuals. Latin hypercube sampling goes through <em>PyDOE</em>'s <code>lhs</code>, with maximin as the default criterion, while Sobol' sampling uses sobol_seq.",
    "sources": [
      "EPCCed/pyrobust"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "EPFL EESD",
        "src": "/brand/users/epfl-eesd.svg",
        "h": 49,
        "href": "https://eesd.epfl.ch/"
      },
      {
        "name": "EPFL",
        "src": "/brand/users/epfl.svg",
        "h": 49,
        "href": "https://www.epfl.ch/"
      }
    ],
    "body": "Pareto-like Sequential Sampling (PSS), a heuristic for global optimisation published in the journal Soft Computing, has its source code in <strong>pareto-optimizer</strong>, developed by the <em>Earthquake Engineering and Structural Dynamics Laboratory</em> at <em>EPFL</em>. The algorithm and its benchmarks are implemented in C++14, Python and Octave (Matlab). In the Python version, the initial population of the search is generated by <em>PyDOE</em>'s <code>lhs</code> under the maximin criterion.",
    "sources": [
      "eesd-epfl/pareto-optimizer"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "PLAI",
        "src": "/brand/users/ubc-plai.png",
        "h": 77,
        "href": "https://plai.cs.ubc.ca"
      },
      {
        "name": "University of British Columbia",
        "src": "/brand/users/university-of-british-columbia.svg",
        "h": 56,
        "href": "https://www.ubc.ca/"
      }
    ],
    "body": "Research code for the thermodynamic variational objective (TVO) from the <em>Pacific Laboratory for Artificial Intelligence</em> at the <em>University of British Columbia</em> lives in <strong>tvo_playground</strong>. A common training loop and losses (TVO, ELBO, IWAE, VIMCO, wake-sleep and others) serve continuous and discrete VAEs, Bayesian neural networks and probabilistic context-free grammars on datasets such as MNIST and Omniglot, and experiments are tracked through sacred and wandb.",
    "sources": [
      "plai-group/tvo_playground"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "UT Austin CHG",
        "src": "/brand/users/ut-austin-chg.png",
        "h": 84,
        "href": "http://chg.ices.utexas.edu/"
      },
      {
        "name": "The University of Texas at Austin",
        "src": "/brand/users/university-of-texas-at-austin.svg",
        "h": 56,
        "href": "https://www.utexas.edu/"
      }
    ],
    "body": "Named after Butler, Estep and Tavener, <strong>BET</strong> is a Python package for data-consistent stochastic forward and inverse problems from the <em>Computational Hydraulics Group</em> at <em>The University of Texas at Austin</em>. Besides measure-based data-consistent stochastic inversion, it implements a broader range of data-consistent methods, with optional parallel features via mpi4py. Inside its sampling module, Latin hypercube samples of the input parameter space are generated by <code>lhs</code> from <em>PyDOE</em> using the center criterion.",
    "sources": [
      "UT-CHG/BET"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "The University of Manchester",
        "src": "/brand/users/university-of-manchester.svg",
        "h": 56,
        "href": "https://www.manchester.ac.uk/"
      }
    ],
    "body": "Statistical inference methods for biological data are the specialty of the <em>Manchester Bioinference Group</em> at <em>The University of Manchester</em>. Written with GPflow and TensorFlow Probability, the group's <strong>GP_Transcription_Dynamics</strong> code implements a Gaussian-process model of transcriptional regulation and reproduces the results of a study of mRNA decay dynamics in the Drosophila embryo, with gene filtering, parameter fitting and MCMC for uncertainty quantification.",
    "sources": [
      "ManchesterBioinference/GP_Transcription_Dynamics"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "Monash University",
        "src": "/brand/users/monash-university.svg",
        "h": 56,
        "href": "https://www.monash.edu/"
      }
    ],
    "body": "Applied to tuberculosis, <strong>AuTuMN</strong> (the Australian Tuberculosis Modelling Network framework) is a set of Python models from the <em>Epidemiological Modelling Unit</em> at <em>Monash University</em> that modularises the development of dynamic disease-transmission models. Its legacy implementation, used until mid-2019, calls <em>PyDOE</em>'s <code>lhs</code> in the model runner to draw Latin hypercube samples of model parameters for uncertainty analysis. <em>PyDOE</em> is also used by the unit's COVID-19 school-closure and economic-impact models.",
    "sources": [
      "monash-emu/Legacy-AuTuMN"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "ARFC",
        "src": "/brand/users/uw-madison-arfc.png",
        "h": 84,
        "href": "https://arfc.github.io"
      },
      {
        "name": "University of Wisconsin–Madison",
        "src": "/brand/users/university-of-wisconsin-madison.svg",
        "h": 63,
        "href": "https://www.wisc.edu/"
      }
    ],
    "body": "<strong>PRIDE</strong> (<strong>P</strong>lan for <strong>R</strong>ap<strong>I</strong>d <strong>DE</strong>carbonization) gathers analysis tools, models and publications for planning rapid decarbonization from the <em>Advanced Reactors and Fuel Cycles</em> group in the <em>Department of Nuclear Engineering and Engineering Physics</em> at the <em>University of Wisconsin–Madison</em>. Its studies cover the hydrogen needed to make the MTD and UI vehicle fleets carbon-free and the optimal sizing of nuclear reactors under scenarios with cheaper reactors, more variable renewables, and hydrogen or thermal storage. Energy-system scenarios run in the <strong>TEMOA</strong> model, automated with Snakemake, while INL's <strong>RAVEN</strong> generates typical time histories.",
    "sources": [
      "arfc/pride"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "Utrecht University",
        "src": "/brand/users/utrecht-university.svg",
        "h": 56,
        "href": "https://www.uu.nl/en"
      }
    ],
    "body": "Multi-energy systems can be simulated and optimized with <strong>AdOpT-NET0</strong> (Advanced Optimization Tool for Networks and Energy), a Python package from the <em>Energy &amp; Resources</em> group at <em>Utrecht University</em>. Conversion technologies and networks for any energy carrier are modeled, and both the design and the operation of the whole system are optimized. Pyomo builds the models, pvlib converts climate data into electricity output, tsam aggregates time series, and a companion visualization tool displays the results.",
    "sources": [
      "UU-ER/AdOpT-NET0"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "BOapp",
        "src": "/brand/users/boapp.png",
        "h": 77,
        "href": "https://github.com/BayesOptApp"
      },
      {
        "name": "Leiden University",
        "src": "/brand/users/leiden-university.svg",
        "h": 70,
        "href": "https://www.universiteitleiden.nl/en"
      }
    ],
    "body": "A study in <em>ACM Transactions on Evolutionary Learning and Optimization</em> (TELO) comparing high-dimensional Bayesian-optimization algorithms on the BBOB benchmark is backed by code that <em>Bayesian Optimization and Applications</em> maintains. Its modular framework makes vanilla Bayesian optimization (scikit-optimize), CMA-ES, random search, SAASBO, RDUCB, PCA-BO, KPCA-BO and TuRBO compatible with <strong>IOHprofiler</strong>, which logs their performance on the 24 BBOB functions of the COCO environment. Generated JSON files configure the experiments, and a single runner script launches them.",
    "sources": [
      "BayesOptApp/IOH-Profiler-HDBO-Comparison"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "KAIST SILAB",
        "src": "/brand/users/kaist-silab.png",
        "h": 84,
        "href": "http://silab.kaist.ac.kr/"
      },
      {
        "name": "KAIST",
        "src": "/brand/users/kaist.svg",
        "h": 49,
        "href": "https://www.kaist.ac.kr/en/"
      }
    ],
    "body": "Improving the sample efficiency of deep reinforcement learning for combinatorial optimization is the point of Symmetric Replay Training, and the <em>Systems Intelligence Laboratory</em> at <em>KAIST</em> publishes the paper's code as <strong>symmetric_replay</strong>. The method is applied on top of existing DRL solvers (AM and POMO for the traveling salesman problem, Sym-NCO for vehicle routing, MatNet for the asymmetric TSP and REINVENT-SELFIES for molecular optimization) alongside the corresponding baselines.",
    "sources": [
      "kaist-silab/symmetric_replay"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "University of Tübingen",
        "src": "/brand/users/university-of-tuebingen.svg",
        "h": 56,
        "href": "https://uni-tuebingen.de/en/"
      }
    ],
    "body": "<strong>HANNAH</strong> (Hardware Accelerator and Neural network searcH), from the <em>Embedded Systems</em> group of the Department of Computer Science at the <em>University of Tübingen</em>, is a framework for hardware-aware neural architecture search. Poetry manages the project, which offers optional extras for vision models, ONNX-runtime and TensorFlow Lite backends, and DVC-based experiment management.",
    "sources": [
      "ekut-es/hannah"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "RWTH Aachen EBC",
        "src": "/brand/users/rwth-ebc.png",
        "h": 42,
        "href": "https://www.ebc.eonerc.rwth-aachen.de/"
      },
      {
        "name": "RWTH Aachen University",
        "src": "/brand/users/rwth-aachen-university.svg",
        "h": 49,
        "href": "https://www.rwth-aachen.de/"
      }
    ],
    "body": "Of three projects from the <em>Institute for Energy Efficient Buildings and Indoor Climate</em> (<em>E.ON Energy Research Center</em>, <em>RWTH Aachen University</em>), two call <em>PyDOE</em>. <strong>BESMod</strong>, a Modelica library of modules for the domain-coupled simulation of building energy systems, won the best paper award at the American Modelica Conference 2022, and its bes-rules tooling calls <code>lhs</code> for the initial samples of a custom Bayesian-optimization loop for simulation-based optimization. Monte Carlo helpers in <strong>pyCity_calc</strong>, a pyCity add-on for energy-balance and economic calculations of city districts, perform Latin-hypercube sampling with <code>lhs</code> under the center, maximin and centermaximin criteria. The third, <strong>pyCity_resilience</strong>, is a pyCity add-on that identifies resilient energy-system configurations.",
    "sources": [
      "RWTH-EBC/BESMod",
      "RWTH-EBC/pyCity_calc",
      "RWTH-EBC/pyCity_resilience"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "QuLab",
        "src": "/brand/users/vanderbilt-qulab.png",
        "h": 84,
        "href": "https://github.com/QuLab-VU"
      },
      {
        "name": "Vanderbilt University",
        "src": "/brand/users/vanderbilt-university.png",
        "h": 49,
        "href": "https://www.vanderbilt.edu/"
      }
    ],
    "body": "Drug synergy is quantified with <strong>MuSyC</strong>, a framework developed by <em>QuLab</em> at <em>Vanderbilt University</em>. MuSyC also has a web application, and the code for that application is kept in a separate repository, <strong>musyc-web</strong>.",
    "sources": [
      "QuLab-VU/musyc-web"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "University of Sheffield",
        "src": "/brand/users/university-of-sheffield.svg",
        "h": 56,
        "href": "https://www.sheffield.ac.uk/"
      }
    ],
    "body": "The <em>University of Sheffield</em> machine learning group wrote <strong>GPyOpt</strong>, a library for Bayesian optimization with Gaussian processes built on GPy. Global optimization with a choice of acquisition functions, sequential or batch optimization of physical experiments, tuning the parameters of machine-learning algorithms and handling large data sets through sparse Gaussian-process models are all within its scope. The core team has since ended its maintenance. <em>PyDOE</em> is optional here: GPyOpt's Latin-hypercube experiment design calls <code>lhs</code> over the continuous variables, with the center criterion by default, to produce the initial points that seed the optimization loop.",
    "sources": [
      "SheffieldML/GPyOpt"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "UVA Research Computing",
        "src": "/brand/users/uva-research-computing.png",
        "h": 84,
        "href": "https://www.rc.virginia.edu/"
      },
      {
        "name": "UVA Hydroinformatics Group",
        "src": "/brand/users/uva-hydroinformatics.png",
        "h": 77,
        "href": "http://uvahydroinformatics.org"
      },
      {
        "name": "University of Virginia",
        "src": "/brand/users/university-of-virginia.svg",
        "h": 56,
        "href": "https://www.virginia.edu/"
      }
    ],
    "body": "Containers deployed on the high-performance computing cluster of the <em>University of Virginia</em> are built from <strong>rivanna-docker</strong>, the Docker and Apptainer recipes maintained by <em>Research Computing</em>, including a RHESSys container image. <strong>pyRHESSys</strong>, from the <em>Hydroinformatics Group</em>, is an object-oriented Python wrapper for the Regional Hydro-Ecologic Simulation System: it creates and manipulates model input, runs the model on local computers and on cyberinfrastructure such as CyberGIS-Jupyter for Water, visualizes outputs and exchanges test cases with HydroShare. Its README names automated model calibration and sensitivity analysis as future work.",
    "sources": [
      "uvarc/rivanna-docker",
      "uva-hydroinformatics/pyRHESSys"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "University of Waterloo",
        "src": "/brand/users/university-of-waterloo.svg",
        "h": 49,
        "href": "https://uwaterloo.ca/"
      }
    ],
    "body": "Adaptive Gaussian-process model-predictive control is the subject of an ECC 2025 paper from the <em>CL2</em> lab at the <em>University of Waterloo</em>, whose code is published as <strong>AdaptiveHGPMPC_ECC25</strong>. Notebooks demonstrate the proposed adaptive likelihood-prior trade-off scheme on a toy example, show that it transfers to a closed-loop control task, and include an ablation of how adaptation speed affects control performance.",
    "sources": [
      "CL2-UWaterloo/AdaptiveHGPMPC_ECC25"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "Medical Machine Learning Lab",
        "src": "/brand/users/muenster-mmll.jpg",
        "h": 63,
        "href": "https://photon.uni-muenster.de/"
      },
      {
        "name": "University of Münster",
        "src": "/brand/users/university-of-muenster.svg",
        "h": 56,
        "href": "https://www.uni-muenster.de/"
      }
    ],
    "body": "With <strong>PHOTONAI</strong>, a high-level Python API from the <em>Medical Machine Learning Lab</em> at the <em>University of Münster</em>, users design and optimize machine-learning pipelines. They select and combine pre-processing and learning algorithms from established toolboxes, arrange them in simple or parallel pipeline streams, and pick cross-validation schemes, performance metrics and hyperparameter-optimization strategies from pre-registered options, with room for custom components at every step. A PLOS ONE paper describes the framework. One of its hyperparameter-optimization backends is based on SMAC.",
    "sources": [
      "wwu-mmll/photonai"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "Contextual Dynamics Laboratory",
        "src": "/brand/users/dartmouth-context-lab.png",
        "h": 84,
        "href": "https://www.context-lab.com/"
      },
      {
        "name": "Dartmouth College",
        "src": "/brand/users/dartmouth-college.svg",
        "h": 35,
        "href": "https://home.dartmouth.edu/"
      }
    ],
    "body": "In the hypercube notebook of the <em>Contextual Dynamics Laboratory</em>, <em>PyDOE</em>'s <code>ff2n</code> generates a two-level full factorial whose rows, rescaled from -1/+1 to the requested range, give the vertices of a hypercube in any number of dimensions. The lab, at <em>Dartmouth College</em>, publishes these Jupyter notebooks to accompany its paper on <strong>HyperTools</strong>, its Python toolbox for visualizing high-dimensional data. They are run against the released HyperTools package and tested with version 0.4.0.",
    "sources": [
      "ContextLab/hypertools-paper-notebooks"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "TEMOA",
        "src": "/brand/users/ncsu-temoa.svg",
        "h": 42,
        "href": "http://temoaproject.org"
      },
      {
        "name": "NC State University",
        "src": "/brand/users/nc-state-university.svg",
        "h": 35,
        "href": "https://www.ncsu.edu/"
      }
    ],
    "body": "<em>North Carolina State University</em> developed <strong>Temoa</strong> (<strong>T</strong>ools for <strong>E</strong>nergy <strong>M</strong>odel <strong>O</strong>ptimization and <strong>A</strong>nalysis), an open-source energy-system optimization framework used for long-term energy planning and analysis under uncertainty. Perfect-foresight and myopic planning, uncertainty analysis and the generation of alternative solutions are all supported. Temoa ships on PyPI with a command-line interface that builds and runs models from configuration files and SQLite databases.",
    "sources": [
      "TemoaProject/temoa"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "SwolfPy",
        "src": "/brand/users/ncsu-swolfpy.png",
        "h": 84,
        "href": "https://swolfpy-project.github.io/"
      },
      {
        "name": "NC State University",
        "src": "/brand/users/nc-state-university.svg",
        "h": 35,
        "href": "https://www.ncsu.edu/"
      }
    ],
    "body": "Municipal solid-waste management gets a life-cycle assessment and optimization framework in <strong>SwolfPy</strong> (<strong>S</strong>olid <strong>W</strong>aste <strong>O</strong>ptimization <strong>L</strong>ife-cycle <strong>F</strong>ramework in <strong>Py</strong>thon), from <em>North Carolina State University</em>. Comparative LCA, contribution analysis and LCI reports are produced across process models such as landfill, parametric and Monte Carlo analyses examine sensitivity and uncertainty, and the optimizer minimizes environmental burdens or cost subject to technical and policy constraints. A multi-start optimization can begin from a Latin-hypercube design: choosing the LHS initial-guess option makes <em>PyDOE</em>'s <code>lhs</code> generate the starting points for the decision variables.",
    "sources": [
      "SwolfPy-Project/swolfpy"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "University of Southern Denmark",
        "src": "/brand/users/university-of-southern-denmark.svg",
        "h": 49,
        "href": "https://www.sdu.dk/en"
      }
    ],
    "body": "Parameter estimation in models compliant with the Functional Mock-up Interface (FMI), such as building and energy-system models, is handled by <strong>modest-py</strong> (ModestPy) from the <em>Center for Energy Informatics</em> at the <em>University of Southern Denmark</em>. Global and local search methods are combined (a genetic algorithm, pattern search, truncated Newton, L-BFGS-B and sequential least squares); the package works with non-continuous and non-differentiable models and scales to multiple cores. Within the genetic algorithm, sets of parameter values for the estimation are sampled by <em>PyDOE</em>'s <code>lhs</code> with the center criterion.",
    "sources": [
      "sdu-cfei/modest-py"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "University of Tartu",
        "src": "/brand/users/university-of-tartu.svg",
        "h": 84,
        "href": "https://bigdata.cs.ut.ee/"
      }
    ],
    "body": "Non-technical users and domain experts are the audience of <strong>iSmartML</strong>, an interactive, user-guided framework from the <em>Data Systems Group</em> at the <em>University of Tartu</em> that improves the utility and usability of AutoML. It gives them a control panel for defining the search space, a meta-learning recommendation engine for search spaces, pre-processors and time budgets, a monitoring panel that alerts when a better pipeline is found, logging that avoids re-exploring configurations across runs, and an explanation module for diagnosing the returned models.",
    "sources": [
      "DataSystemsGroupUT/ismartml"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "ALSETLab",
        "src": "/brand/users/rpi-alsetlab.png",
        "h": 63,
        "href": "http://alsetlab.com"
      },
      {
        "name": "Rensselaer Polytechnic Institute",
        "src": "/brand/users/rensselaer-polytechnic-institute.png",
        "h": 49,
        "href": "https://www.rpi.edu/"
      }
    ],
    "body": "Prof. Luigi Vanfretti's research team at <em>Rensselaer Polytechnic Institute</em>, <em>ALSETLab</em>, develops <strong>ModelicaGridData</strong>, a tool that generates power-grid dynamic-simulation data with Python and Modelica models for machine-learning applications. OpenIPSL phasor-domain simulation models are fed with power-flow solutions computed from real load-data patterns, such as data downloaded from NYISO, and the simulations run locally with Dymola or OpenModelica. Ready-made virtual machines are provided for testing.",
    "sources": [
      "ALSETLab/ModelicaGridData"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "MOG",
        "src": "/brand/users/jyu-mog.png",
        "h": 56,
        "href": "https://optgroup.it.jyu.fi/"
      },
      {
        "name": "University of Jyväskylä",
        "src": "/brand/users/university-of-jyvaskyla.png",
        "h": 70,
        "href": "https://www.jyu.fi/en"
      }
    ],
    "body": "Two projects of <em>The Multiobjective Optimization Group</em> at the <em>University of Jyväskylä</em> use <em>PyDOE</em>: <strong>pyRVEA</strong> and <strong>desdeo-emo</strong>. pyRVEA implements the <strong>R</strong>eference <strong>V</strong>ector guided <strong>E</strong>volutionary <strong>A</strong>lgorithm in Python for multi-objective minimization, with visualization and interactive preferences given as reference points, and calls <code>lhs</code> both to create the initial population and to generate training data for its test problems. The evolutionary methods of the legacy <strong>DESDEO</strong> 1.0 interactive multiobjective optimization framework are provided by desdeo-emo, which relies on <code>lhs</code> for initial populations and reference vectors; its notebooks also sample training data with it for data-driven optimization with surrogate models such as BioGP and EvoNN.",
    "sources": [
      "industrial-optimization-group/pyRVEA",
      "industrial-optimization-group/desdeo-emo"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "TerraPower",
        "src": "/brand/users/terrapower.png",
        "h": 63,
        "href": "https://www.terrapower.com/"
      }
    ],
    "body": "<em>TerraPower</em>'s open-source Python framework for nuclear-reactor design and analysis is <strong>ARMI</strong> (<strong>A</strong>dvanced <strong>R</strong>eactor <strong>M</strong>odeling <strong>I</strong>nterface). It provides a flexible reactor data model, standardized communication between physics kernels through ARMI plugins, dependable input and output formats, and an ecosystem for multi-disciplinary simulation of core physics such as fuel performance and neutronics. Teams use it on large compute clusters to run thousands of perturbed cases in parallel for design decisions and sensitivity analyses. <em>PyDOE</em> has been used in its case-suite tooling through a <code>LatinHyperCubeSuiteBuilder</code>, which builds suites of perturbed cases from a Latin-hypercube design.",
    "sources": [
      "terrapower/armi"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "ERIGrid 2.0",
        "src": "/brand/users/erigrid2.webp",
        "h": 63,
        "href": "https://erigrid2.eu/"
      }
    ],
    "body": "Within <em>ERIGrid 2.0</em>, the European Horizon 2020 research infrastructure for smart grid and smart energy systems, a toolbox of design-of-experiments and sensitivity-analysis methods called <strong>toolbox_doe_sa</strong> was developed. It reads simulation parameters from a JSON configuration, generates parameter variations, runs simulation or laboratory experiments and analyzes the results, pairing sampling schemes (Sobol' sequences, extreme points, LHS, Sobol' indices, eFAST) with analyses such as meta models, ANOVA and Sobol' indices. Its example scenario is a multi-energy networks benchmark model. Latin hypercube samples over the varied factors come from <em>PyDOE</em>'s <code>lhs</code> and become the parameter sets of the individual simulation runs.",
    "sources": [
      "ERIGrid2/toolbox_doe_sa"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "IO-SEA",
        "src": "/brand/users/io-sea.png",
        "h": 42,
        "href": "https://iosea-project.eu/"
      }
    ],
    "body": "Choosing the storage tier for each I/O phase so as to reduce total workflow duration and Burst Buffer usage is the goal of the <strong>recommendation-system</strong> built in the European <em>IO-SEA</em> project, which optimizes data placement for High-Performance Computing workflows. An application decomposer analyzes each job's I/O behavior, a performance model predicts I/O latency on each storage tier and an execution simulator virtually replays the workflow, while optimization heuristics driven by a black-box optimization engine explore the parameter space.",
    "sources": [
      "io-sea/recommendation-system"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "Gemseo",
        "src": "/brand/users/gemseo.svg",
        "h": 49,
        "href": "https://gemseo.org"
      }
    ],
    "body": "<em>IRT Saint Exupéry</em> develops <strong>GEMSEO</strong> (<strong>G</strong>eneric <strong>E</strong>ngine for <strong>M</strong>ultidisciplinary <strong>S</strong>cenarios, <strong>E</strong>xploration and <strong>O</strong>ptimization), an open-source library that automates multidisciplinary processes, starting with multidisciplinary design optimization (MDO). Disciplines wrapping Python, Matlab, Scilab, Excel or executables are assembled into MDO formulations, and the library provides coupling, optimization, design of experiments, surrogate models, machine learning and uncertainty quantification. Through its PyDOE algorithms library, <em>PyDOE</em> is exposed as DOE algorithms such as <code>PYDOE_LHS</code> and <code>PYDOE_FULLFACT</code> for scenario sampling and for training and calibrating surrogate models. Examples and tests of the <strong>gemseo-umdo</strong> plugin (MDO under uncertainty) run <code>PYDOE_FULLFACT</code> designs, and the wider ecosystem includes the <strong>gemseo-petsc</strong> (PETSc linear and ODE solvers), <strong>gemseo-mma</strong> (Method of Moving Asymptotes) and <strong>gemseo-benchmark</strong> (benchmarking of optimization algorithms) plugins.",
    "sources": [
      "gemseo/gemseo",
      "gemseo/gemseo-umdo",
      "gemseo/gemseo-petsc",
      "gemseo/gemseo-mma",
      "gemseo/gemseo-benchmark"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "SMT",
        "src": "/brand/users/smt.png",
        "h": 63,
        "href": "https://smt.readthedocs.io/"
      }
    ],
    "body": "Developed jointly by <em>ONERA</em> (the French Aerospace Lab), <em>NASA Glenn Research Center</em>, <em>ISAE-SUPAERO/ICA</em> and the <em>University of Michigan</em> MDO Lab, <strong>SMT</strong> (<strong>S</strong>urrogate <strong>M</strong>odeling <strong>T</strong>oolbox) is a Python library of surrogate modeling methods, sampling techniques and benchmarking functions. It emphasizes derivatives (gradient-enhanced training, prediction derivatives and derivatives with respect to training data) and Kriging with mixed and hierarchical variables, including partial-least-squares Kriging. <em>PyDOE</em> is a core dependency. SMT's <code>LHS</code> sampling method is built on <em>PyDOE</em>'s <code>lhs</code>, while <code>BoxBehnken</code>, <code>Factorial</code>, <code>Gsd</code> and <code>PlackettBurman</code> adapt <code>bbdesign</code>, <code>fullfact</code>, <code>gsd</code> and <code>pbdesign</code> to SMT's sampling interface to generate surrogate training points.",
    "sources": [
      "SMTorg/smt"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "Deltares Research",
        "src": "/brand/users/deltares-research.jpg",
        "h": 84,
        "href": "https://www.deltares.nl/en/"
      },
      {
        "name": "Deltares",
        "src": "/brand/users/deltares.svg",
        "h": 42,
        "href": "https://www.deltares.nl/en/"
      }
    ],
    "body": "NVIDIA PhysicsNeMo is the basis of <strong>PhysicsNeMo-projects</strong>, a collection of runnable deep-learning projects and examples maintained by <em>Deltares</em>, the Dutch independent institute for applied research on water and subsurface. Archived and migrated Sym-based examples, such as wave-equation and 2D/3D reservoir-simulation workflows, sit alongside guidance for installing PhysicsNeMo on GPU workstations. The reservoir-simulation examples import <code>lhs</code> from <em>PyDOE</em> and expose it as a sampling option that scales Latin hypercube samples to a given parameter interval.",
    "sources": [
      "Deltares-research/PhysicsNeMo-projects"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "HELIX",
        "src": "/brand/users/agh-helix.svg",
        "h": 84,
        "href": "https://github.com/helix-agh"
      },
      {
        "name": "AGH University of Kraków",
        "src": "/brand/users/agh-university-of-krakow.svg",
        "h": 84,
        "href": "https://www.agh.edu.pl/en"
      }
    ],
    "body": "Automatic design of optimization test problems with large language models is the topic of the paper accompanied by <strong>ela-guided-llm-bench</strong>, from <em>HELIX</em> (<strong>H</strong>euristics, <strong>E</strong>volution and <strong>L</strong>earning for <strong>I</strong>ntelligent e<strong>X</strong>ploration) at <em>AGH University of Kraków</em>. Its methods take target exploratory landscape analysis (ELA) feature values extracted from BBOB or MA-BBOB problems and evolve Python functions whose landscape characteristics match those targets. The comparison covers the ELA-guided EoTF algorithm, LLaMEA, a zero-shot baseline and a genetic-programming baseline.",
    "sources": [
      "helix-agh/ela-guided-llm-bench"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "SWIFT",
        "src": "/brand/users/swift.png",
        "h": 84,
        "href": "https://www.swiftsim.com"
      }
    ],
    "body": "Instead of running every cosmological simulation, <strong>SWIFT-Emulator</strong> from the <em>SWIFT</em> astrophysics simulation collaboration predicts their outputs, using Gaussian process regression with george and sensitivity analysis with SALib. A single consistent API covers building a model design, reading SWIFT data, training an emulator on a few base simulations, validating it, comparing it against observations across parameter space and visualizing the results. The base simulations are run at a Latin hypercube design of model parameters, which <em>PyDOE</em>'s <code>lhs</code> generates with the <code>maximin</code> criterion.",
    "sources": [
      "SWIFTSIM/emulator"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "Spack",
        "src": "/brand/users/spack.svg",
        "h": 84,
        "href": "https://spack.io"
      }
    ],
    "body": "Multiple versions, configurations, platforms and compilers are supported by <em>Spack</em>, the flexible package manager for HPC systems. Its <strong>pypi-to-spack-package</strong> tool imports the latest PyPI metadata from the public BigQuery dataset into a local SQLite database, performs trivial version bumps of existing Python <code>package.py</code> recipes and can generate a full Spack repository from a list of requirements.",
    "sources": [
      "spack/pypi-to-spack-package"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "Symbench",
        "src": "/brand/users/symbench.png",
        "h": 84,
        "href": "https://symbench.github.io/Anvil"
      }
    ],
    "body": "In <strong>Anvil</strong>, an open-source scientific-machine-learning tool from <em>Symbench</em> for CFD-based design evaluation, FreeCAD generates shapes from a parametric CAD seed design and OpenFOAM analyzes them. Three modes are available: CFD analysis of a single STL file, automatic data generation over a design space for a given evaluation budget, and Bayesian optimization with a user-defined acquisition function. The generated data can also train low-fidelity surrogate models of the CFD process. To select the designs to evaluate, the samplers call <em>PyDOE</em>'s <code>lhs</code> with the <code>maximin</code> and <code>corr</code> criteria and scale the result to the design-parameter ranges.",
    "sources": [
      "symbench/Anvil"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "flowcean",
        "src": "/brand/users/flowcean.svg",
        "h": 84,
        "href": "https://flowcean.me"
      }
    ],
    "body": "Models of cyber-physical systems can be defined, simulated, identified, evaluated and reproduced with <strong>flowcean</strong>, a research-oriented Python toolkit that builds on research into automatic model generation. Hybrid systems with continuous dynamics, events, transitions and resets are supported, hybrid dynamics and mode selectors are identified with HyDRA, and models can be learned from offline datasets, incremental streams and active environments. Environments, transforms, learners, metrics and evaluation strategies are reusable components, with adapters for established Python ML libraries.",
    "sources": [
      "flowcean/flowcean"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "Systems Engineering Design Group",
        "src": "/brand/users/sed-group.png",
        "h": 56,
        "href": "https://systemsengineering.design/"
      }
    ],
    "body": "The margin value method of Brahma and Wynn for design-space exploration is implemented in <strong>mvmlib</strong> by the <em>Systems Engineering Design Group</em> (Gothenburg, Sweden). According to its documentation, matplotlib serves visualization, scikit-fuzzy serves fuzzy-logic modeling and <em>PyDOE</em> serves design-space exploration. Inside the DOE module, <code>lhs</code> from <em>PyDOE</em> builds Latin hypercube designs between the lower and upper bounds of the design variables, and full-factorial designs are offered alongside.",
    "sources": [
      "sed-group/mvmlib"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "MetaEvo",
        "src": "/brand/users/metaevo.jpg",
        "h": 84,
        "href": "https://github.com/MetaEvo"
      }
    ],
    "body": "Next-generation evolutionary computation and meta-black-box optimization are the research topics of the <em>MetaEvolution Lab</em>. Accepted at GECCO 2025, its <strong>APDMMO</strong> performs accurate peak detection in multimodal optimization via approximated landscape learning, in three stages: global landscape fitting trains a landscape learner for a problem, free-of-trial peak detection locates potential peak areas, and parallel local search refines the solutions. Evaluation uses peak ratio and success rate on the CEC2013 multimodal optimization benchmark.",
    "sources": [
      "MetaEvo/APDMMO"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "STK",
        "src": "/brand/users/stk.png",
        "h": 84,
        "href": "https://github.com/stk-kriging"
      }
    ],
    "body": "Bayesian sequential design of computer experiments for quantile set inversion is the topic of an article whose data and scripts, <strong>qsi-paper-experiments</strong>, were published by the team behind <em>STK</em>, a small toolbox for Kriging (<em>Université Paris-Saclay</em>, <em>CNRS</em>, <em>CentraleSupélec</em> and <em>EDF R&amp;D</em>). Most experiments use Matlab with STK and the contrib-qsi repository, and a demonstration shows the QSI-SUR strategy choosing points from a random initial design. Python is needed only to reproduce the results of the ECL algorithm of Cole et al. (2023), used for comparison.",
    "sources": [
      "stk-kriging/qsi-paper-experiments"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "DataCanvas",
        "src": "/brand/users/datacanvas.jpg",
        "h": 77,
        "href": "https://www.datacanvas.com/"
      }
    ],
    "body": "Tabular data is the target of <strong>DeepTables</strong>, <em>DataCanvas</em>'s deep-learning toolkit with automated architecture and hyperparameter search. It aims to learn feature interactions efficiently in neural networks, bringing models from CTR prediction research (such as DeepFM, Wide&amp;Deep, DCN and PNN) to general tabular data in an end-to-end toolkit. Non-experts should find it easy to use, it is meant to perform well out of the box, and it is designed to be easily extended.",
    "sources": [
      "DataCanvasIO/DeepTables"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "Qubole",
        "src": "/brand/users/qubole.png",
        "h": 56,
        "href": "https://www.qubole.com"
      }
    ],
    "body": "Apache Spark application configurations are auto-tuned with machine learning and mathematical models by <strong>uchit</strong>, which <em>Qubole</em>, a cloud big-data platform for analysts and data engineers, built and which was presented at Spark+AI Summit Europe 2019. An ML model is trained on the configurations and run times of previous runs; candidate configurations are then sampled, non-optimal ones are pruned with domain-specific models, and the best-performing configuration is predicted. To pick representative configurations covering the whole combined configuration space, the discrete sampler runs <em>PyDOE</em>'s <code>lhs</code> with the <code>center</code> criterion.",
    "sources": [
      "qubole/uchit"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "DessIA Technologies",
        "src": "/brand/users/dessia.svg",
        "h": 49,
        "href": "https://dessia.io"
      }
    ],
    "body": "Python apps that can be uploaded to and interpreted by Dessia platform instances are built with an SDK whose common part, <strong>dessia_common</strong>, comes from <em>DessIA Technologies</em>, a Paris-based engineering-software company. Objects that inherit from its <code>DessiaObject</code> base class gain the abilities needed to be handled by the platform, and its datatools include sampling utilities for design studies. The sampling module generates designs of experiments over the sampled attributes of engineering objects with <em>PyDOE</em>'s <code>fullfact</code> and <code>lhs</code> (with a selectable criterion), next to Monte Carlo sampling.",
    "sources": [
      "Dessia-tech/dessia_common"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "Djura",
        "src": "/brand/users/djura.png",
        "h": 84,
        "href": "https://www.djura.it/"
      }
    ],
    "body": "OpenSeesPy structural models are built and run with <strong>opensees-modeller</strong>, a set of scripts maintained by <em>Djura</em>, a risk-data engineering company. To simulate correlated demand parameters, its demand module draws Latin hypercube realizations with <em>PyDOE</em>'s <code>lhs</code> and maps them to standard-normal variates through the normal inverse CDF.",
    "sources": [
      "djura-risk-data-engineering/opensees-modeller"
    ],
    "packages": [
      "pydoe"
    ]
  },
  {
    "logos": [
      {
        "name": "Fijishi",
        "src": "/brand/users/fijishi.png",
        "h": 56,
        "href": "https://fijishi.com/fijishi-sdgs/"
      }
    ],
    "body": "GridCal, a pure-Python platform for power systems research and simulation, is the base of <strong>RS-Cross-Power-System</strong>, one of the open-source sustainable-development projects maintained by <em>Fijishi</em>, a UK company. Its features include AC/DC power flow with several Newton-Raphson and approximate methods, optimal power flow and generation dispatch, time series with profiles, PTDF-based flow estimation, Monte Carlo and Latin hypercube stochastic power flow, blackout cascading, short-circuit analysis, and import and export of formats such as CIM, PSS/e and Matpower.",
    "sources": [
      "Fijishi-Enterprises/RS-Cross-Power-System"
    ],
    "packages": [
      "pydoe"
    ]
  }
]
