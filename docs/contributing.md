---
icon: fontawesome/solid/code-pull-request
---

# Contributing

Thank you for your interest in contributing.
This guide explains how to report issues, propose changes, and keep contributions consistent across code, documentation, and testing.

## How to Contribute

You can contribute in several ways:

- Report bugs or suggest improvements through GitHub Issues.
- Answer questions and help other users.
- Submit pull requests.
- Improve or expand documentation.
- Add or improve tests.
- Review open pull requests.

> Before starting significant work (other than small typo or minor bug fixes), please open an issue first to discuss your proposal.

## Reporting Issues

When filing an issue:

- Search existing issues to avoid duplicates.
- Use a clear, descriptive title and include a category where possible (for example: `bug - ...`, `feature-req - ...`).
- For bugs, provide steps to reproduce the issue.
- Describe expected behavior and actual behavior.
- Include environment details when relevant (OS, Python version, dependency versions).
- If possible, share a minimal reproducible example.

## Submitting Pull Requests

### Prerequisites

You will need:

- `git`
- [`uv`](https://docs.astral.sh/uv/getting-started/installation)
- Any code editor or IDE (for example VS Code, PyCharm, or similar)

### Installation and Setup

Fork the repository on GitHub and clone it locally.

```bash
git clone https://github.com/<your-username>/<repository>.git --depth 1
cd <repository>
uv sync
```

Create a new branch for your changes.

```bash
git checkout -b <your-branch-name>
```

### Run Linting and Tests

Add or update tests when your change affects behavior.
Run linting and tests before opening your PR.

```bash
# linting and formatting (if applicable)
uvx ruff format .
uvx ruff check --fix .

# tests (if available)
uv run pytest -n auto tests
```

### Build Documentation

If you changed documentation, build and preview docs locally and check for warnings.

```bash
uv run --with=zensical zensical build --clean --strict
```

### Open a Pull Request

After finalizing your changes:

1. Commit with a descriptive message.
2. Push your branch to your fork.
3. Open a **draft pull request** against the parent repository's default branch.
4. Include a clear summary and reference related issues.

Mark the PR as ready for review when checks pass and the change is ready.

## Good First Contributions

- Improve documentation clarity and examples.
- Fix broken links, formatting, and small consistency issues.
- Add tests for uncovered behavior.
- Pick up `good first issue` or documentation-tagged issues.

Thank you for helping improve eggzec.
