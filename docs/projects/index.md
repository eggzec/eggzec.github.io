---
icon: lucide/package
---

# Projects

All packages are open source, available on PyPI, and actively maintained. They are designed to compose well together — for example, `sparse_grid` and `smolpack` share the same sparse-grid foundations, `polpack` feeds quadrature rules used by `smolpack`, and `soerp3` can build on any of the numerical outputs.

---

## Numerical Analysis

### soerp3

**Second Order Error Propagation for Python**

`soerp3` is the Python implementation of the original Fortran code `SOERP` by N. D. Cox. It applies a second-order analysis to error propagation (uncertainty analysis), allowing you to transparently track the effects of uncertainty through mathematical calculations. The result of all calculations produces a *mean*, *variance*, and *standardized skewness and kurtosis* coefficients.

The package requires the **first eight statistical moments** of the input distributions (mean, variance, and standardized 3rd–8th moments). These can be supplied manually, or generated using built-in constructors or `scipy.stats` distributions.

| | |
|---|---|
| **Repository** | [github.com/eggzec/soerp3](https://github.com/eggzec/soerp3) |
| **Documentation** | [eggzec.github.io/soerp3](https://eggzec.github.io/soerp3/) |
| **PyPI** | `pip install soerp3` |
| **License** | BSD-3-Clause |

```python
from soerp3 import N, umath

H = N(64, 0.5)    # Normal(mean=64, std=0.5)
M = N(16, 0.1)
P = N(361, 2)
t = N(165, 0.5)
C = 38.4
Q = C * umath.sqrt((520 * H * P) / (M * (t + 460)))
Q.describe()
```

---

### sparse\_grid

**A Python Sparse Grid Package**

`sparse_grid` is a pure-Python implementation of regular sparse grids over box domains. It provides hierarchical index generation, nodal-to-hierarchical coefficient conversion, and fast function evaluation using the hat (piecewise-linear) basis.

| | |
|---|---|
| **Repository** | [github.com/eggzec/sparse_grid](https://github.com/eggzec/sparse_grid) |
| **Documentation** | [eggzec.github.io/sparse_grid](https://eggzec.github.io/sparse_grid/) |
| **PyPI** | `pip install sparse-grid` |
| **License** | BSD-3-Clause |

```python
from sparse_grid import SparseGrid

sg = SparseGrid(dim=2, level=3)
sg.generate_points()
for index in sg.indices:
    pos = sg.g_p[tuple(index)].pos
    sg.g_p[tuple(index)].fv = (
        4.0 * pos[0] * (1.0 - pos[0]) * 4.0 * pos[1] * (1.0 - pos[1])
    )
sg.nodal_2_hier()
print(sg.eval_funct([0.25, 0.75]))
```

---

### smolpack

**Multidimensional Quadrature Using Sparse Grids for Python**

`smolpack` is a high-performance library for numerical integration (cubature) over the unit hypercube [0,1]^d using Smolyak's algorithm with Clenshaw–Curtis quadrature rules. Two solvers are provided: a *delayed Clenshaw–Curtis* variant (fewer function evaluations) and a *standard Clenshaw–Curtis* variant.

| | |
|---|---|
| **Repository** | [github.com/eggzec/smolpack](https://github.com/eggzec/smolpack) |
| **Documentation** | [eggzec.github.io/smolpack](https://eggzec.github.io/smolpack/) |
| **PyPI** | `pip install smolpack` |
| **License** | LGPL-2.1 |

```python
import numpy as np
import smolpack

def my_func(dim, x):
    return np.exp(np.sum(x))

result = smolpack.int_smolyak(my_func, dim=3, qq=5)
```

---

### sdepack

**Runge–Kutta Numerical Integration of Stochastic Differential Equations**

`sdepack` provides high-performance numerical solvers for scalar Itô SDEs of the form:

$$dX(t) = F(X, t)\,dt + Q\,G(X, t)\,dW(t)$$

Solvers range from the first-order **Euler–Maruyama** scheme to fourth-order stochastic Runge–Kutta methods using Kasdin coefficients. All solvers are deterministic via seed-controlled integration.

| | |
|---|---|
| **Repository** | [github.com/eggzec/sdepack](https://github.com/eggzec/sdepack) |
| **Documentation** | [eggzec.github.io/sdepack](https://eggzec.github.io/sdepack/) |
| **PyPI** | `pip install sdepack` |
| **License** | MIT |

```python
import numpy as np
import sdepack

x = np.zeros(101, dtype=np.float64)
sdepack.rk4_ti_solve(
    lambda x: -0.5 * x,   # drift
    lambda x: 1.0,          # diffusion
    x, 0.0, 10.0, 1.0, 100, 0.1, 42
)
```

---

## Special Functions & Algebra

### polpack

**Special Functions and Recursively-Defined Polynomial Families**

`polpack` is a high-performance library for evaluating special functions and recursively-defined polynomial families. The numerical core is written in Fortran and compiled via `f2py`. It includes routines for **Bernoulli**, **Chebyshev**, **Gegenbauer**, **Hermite**, **Laguerre**, and **Legendre** polynomials, among others, as well as combinatorial functions.

| | |
|---|---|
| **Repository** | [github.com/eggzec/polpack](https://github.com/eggzec/polpack) |
| **Documentation** | [eggzec.github.io/polpack](https://eggzec.github.io/polpack/) |
| **PyPI** | `pip install polpack` |
| **License** | LGPL-2.1 |

```python
import numpy as np
import polpack

bell = np.zeros(11, dtype=np.int32)
polpack.bell(10, bell)
print(f"Bell numbers: {bell}")
```

---

### NULAPACK

**NUmerical Linear Algebra PACKage**

NULAPACK is a lightweight, high-performance numerical linear algebra library. Core subroutines are implemented in Fortran for efficiency, with convenient C++ and Python interfaces. Developed under the [nulapack](https://github.com/nulapack) organisation, maintained by eggzec contributors.

| | |
|---|---|
| **Repository** | [github.com/nulapack/nulapack](https://github.com/nulapack/nulapack) |
| **Documentation** | [nulapack.github.io/NULAPACK](https://nulapack.github.io/NULAPACK/) |
| **PyPI** | `pip install nulapack` |
| **License** | GPL-3.0 |

---

## Engineering & Design

### deltaFlow

**Power System Analysis Tool**

`deltaFlow` is a power system analysis tool for steady-state and dynamic simulation of electrical networks. It is designed for engineers and researchers working on grid analysis, load flow studies, and power system planning.

| | |
|---|---|
| **Repository** | [github.com/eggzec/deltaFlow](https://github.com/eggzec/deltaFlow) |
| **Documentation** | [eggzec.github.io/deltaFlow](https://eggzec.github.io/deltaFlow/) |
| **License** | Open Source |

---

### pydoe

**Design of Experiments for Python**

`pydoe` enables scientists, engineers, and statisticians to efficiently construct experimental designs. It provides extensive support for factorial, response surface, and space-filling designs. Developed under the [pydoe](https://github.com/pydoe) organisation, maintained by eggzec contributors.

Supported design families:

- Full-Factorial and 2-level Full-Factorial
- Fractional Factorial (with aliasing, resolution, and optimal selection)
- Plackett–Burman
- Generalized Subset Designs
- Box–Behnken, Central Composite
- Latin Hypercube Sampling

| | |
|---|---|
| **Repository** | [github.com/pydoe/pydoe](https://github.com/pydoe/pydoe) |
| **Documentation** | [pydoe.github.io/pydoe](https://pydoe.github.io/pydoe/) |
| **PyPI** | `pip install pydoe` |
| **Conda** | `conda install -c conda-forge pydoe` |
| **License** | BSD-3-Clause |

---

## In Progress

### permit

**License as a Service (LaaS) MVP**

`permit` is a minimal viable product exploring license-as-a-service infrastructure — programmatic license issuance, verification, and management for software projects.

[:fontawesome-brands-github: github.com/eggzec/permit](https://github.com/eggzec/permit)

---

### qqq

**Web Interface for Sun Grid Engine**

`qqq` is a web interface for Sun Grid Engine (SGE) that visualises cluster jobs and allows basic job management. Useful for HPC users who prefer a browser-based view over the `qstat` command line.

[:fontawesome-brands-github: github.com/eggzec/qqq](https://github.com/eggzec/qqq)
