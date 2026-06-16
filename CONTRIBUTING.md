# Contributing to Professional Repo Docs Skill

Thank you for your interest in contributing! This guide explains how to get involved.

## How to Contribute

### Reporting Bugs

If you find a bug, please [open an issue](https://github.com/ChanMeng666/professional-repo-docs-skill/issues/new/choose) with:

- Steps to reproduce the problem
- Expected vs. actual behavior (screenshots or logs help)
- Your environment (OS, and relevant runtime/version)

### Suggesting Features

Have an idea? [Open a feature request](https://github.com/ChanMeng666/professional-repo-docs-skill/issues/new/choose) describing the problem you want to solve and your proposed solution.

### Submitting Changes

1. **Fork** the repository and **clone** your fork:
   ```bash
   git clone https://github.com/<your-username>/professional-repo-docs-skill.git
   cd professional-repo-docs-skill
   ```
2. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** and verify them locally (see Development Setup below).
4. **Commit** with a clear message following [Conventional Commits](https://www.conventionalcommits.org/):
   ```bash
   git commit -m "feat: short description of your change"
   ```
5. **Push** and open a Pull Request against the `main` branch.

## Development Setup

This is a Claude Code skill repo, not a buildable app — the engine is dependency-free **Node.js
(≥ 18)** and the rest is Markdown templates and config. There is nothing to `npm install`.

```bash
# Run the scaffold engine against a throwaway project to test a change
mkdir -p /tmp/probe && cd /tmp/probe && git init -q
node /path/to/professional-repo-docs-skill/skills/professional-repo-docs/scripts/scaffold.mjs \
  --dir /tmp/probe --readme lite --license MIT --owner ChanMeng666 --repo probe
# expect README.md, LICENSE, .github/FUNDING.yml (wired), AGENTS.md, issue/PR templates, etc.
```

`.github/workflows/validate.yml` runs this same check on every push/PR.

**Where to make changes:**
- Generated content → edit the templates in `skills/professional-repo-docs/assets/` (`*.tmpl` use
  `{{PLACEHOLDER}}` substitution; `LICENSE`/`CODE_OF_CONDUCT.md` are copied **verbatim** — don't
  hand-edit their wording).
- Detection / placement logic → `skills/professional-repo-docs/scripts/scaffold.mjs`.
- Skill behavior, workflow, or trigger description → `skills/professional-repo-docs/SKILL.md`.
- Read `AGENTS.md` first — it documents the architecture, conventions, and the project's gotchas.

## Code of Conduct

By participating, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). For questions or
support, see [SUPPORT.md](SUPPORT.md). For security issues, see [SECURITY.md](SECURITY.md).
