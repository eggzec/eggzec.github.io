---
icon: fontawesome/solid/pen
---

# ruff and uv!

<div style="display:flex;align-items:center;gap:16px;margin-top:6px;margin-bottom:20px;">
  <a href="https://docs.astral.sh/ruff/" target="_blank" rel="noopener"><img src="https://docs.astral.sh/ruff/assets/bolt.svg" alt="ruff" style="height:56px;"></a>
  <a href="https://docs.astral.sh/uv/" target="_blank" rel="noopener"><img src="https://docs.astral.sh/uv/assets/logo-letter.svg" alt="uv" style="height:56px;"></a>
</div>

If you are building and maintaining Python packages, `ruff` and `uv` are one of the most practical combinations available today. Together, they create a development rhythm that feels both precise and lightweight: quick feedback, fewer moving parts, and a workflow that stays readable for individual maintainers and teams alike.

## Why `ruff`

`ruff` works like a careful editor that is also remarkably fast. It catches style and correctness issues early, enforces consistent conventions across files, and reduces noisy review cycles before code ever reaches pull requests. Because formatting and linting live in the same ecosystem, the codebase keeps a clean, coherent voice without requiring a stack of separate tools.

In practice, this means better maintainability and less friction. Contributors spend less time debating formatting details and more time improving logic, tests, and documentation.

## Why `uv`

`uv` brings speed and clarity to the parts of Python development that often feel repetitive: creating environments, installing dependencies, and running project commands. Its unified command surface makes daily workflows easier to remember and easier to document, which is especially valuable for open-source onboarding.

For package maintainers, the strongest advantage is reproducibility. When the setup path is predictable and quick, local development, CI checks, and release preparation stay aligned with fewer surprises.

## Minimal Setup

```bash
uv venv
uv pip install -e .
uv pip install ruff pytest
ruff check .
ruff format .
uv run pytest
```
