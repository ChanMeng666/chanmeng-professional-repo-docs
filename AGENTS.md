# AGENTS.md

This file provides project guidance to AI coding assistants (Claude Code, GitHub Copilot, Cursor,
Codex, etc.) working with this repository. Read it before writing or changing any code.

## Project Overview

Professional Repo Docs Skill — a Claude Code skill that scaffolds professional, agent-first GitHub
repository documentation (README, LICENSE, FUNDING, CODE_OF_CONDUCT, CONTRIBUTING, SECURITY,
SUPPORT, GOVERNANCE, CHANGELOG, CITATION.cff, issue/PR templates, AGENTS.md, llms.txt) for any
project.

- **Primary language / stack:** Node.js (the `scaffold.mjs` engine, plain ESM, no deps) + Markdown
  templates + a small amount of YAML/JSON config. There is intentionally **no root manifest** — this
  is a skill repo, not a buildable app.
- **Default branch:** `main`
- **Repository:** https://github.com/ChanMeng666/chanmeng-professional-repo-docs

## Commands

```bash
# Run the scaffold engine against a target project (this is the skill's core action)
node skills/chanmeng-professional-repo-docs/scripts/scaffold.mjs --dir <target-repo> --readme lite --license MIT

# Quick local smoke test: scaffold into a throwaway dir and check key outputs
mkdir -p /tmp/probe && cd /tmp/probe && git init -q
node <repo>/skills/chanmeng-professional-repo-docs/scripts/scaffold.mjs --dir /tmp/probe --readme lite --license MIT --owner ChanMeng666 --repo probe
# expect: README.md, LICENSE, .github/FUNDING.yml (wired), AGENTS.md, issue templates

# CI mirrors this — see .github/workflows/validate.yml (runs on every push/PR)
```

There is no build/lint/test toolchain to install; the engine is dependency-free Node ≥ 18.

## Architecture & Conventions

- **`skills/chanmeng-professional-repo-docs/`** is the actual installable skill (this nested layout mirrors
  `chanmeng-typst` so the `.claude-plugin/` marketplace path resolves). Everything outside it
  (root README/LICENSE/CHANGELOG, `.claude-plugin/`, `.github/`) is repo packaging.
- **`SKILL.md`** — the skill's instructions + trigger description. The `description` frontmatter is
  the triggering mechanism; keep it broad and "pushy" (it was validated at 100% recall / 100%
  specificity on a 20-query eval).
- **`assets/`** — the source-of-truth content. Two kinds:
  - **Verbatim files** copied as-is: `CODE_OF_CONDUCT.md` (Contributor Covenant 2.1), `licenses/*`,
    `FUNDING.yml`, `brand/chan-meng-logo.svg`.
  - **`*.tmpl` templates** with `{{NAME}}/{{OWNER}}/{{REPO}}/{{BRANCH}}/{{DESCRIPTION}}/{{STACK}}/`
    `{{DEVSETUP}}/{{LICENSE_NAME}}/{{SPDX}}/{{VERSION}}/{{DATE}}` placeholders.
- **`scripts/scaffold.mjs`** — the engine. Detects git remote (owner/repo), branch, stack +
  per-stack dev commands, project name (title-cased slug with acronym fixups) and description, then
  renders templates and places files. **Idempotent and non-destructive**: only writes files that are
  missing, except `.github/FUNDING.yml` which is always re-wired.
- **`references/`** — guidance the skill reads at specific workflow steps (license selection, README
  guide, agent-first spec, doc catalog, post-setup).

## Gotchas & Anti-patterns

- **Never regenerate `LICENSE` or `CODE_OF_CONDUCT.md` by hand.** Always copy from `assets/`. They're
  standard/legal texts — paraphrasing is wrong, and regenerating the Contributor Covenant's
  enumerated-conduct list once tripped an output content filter. Copying the file avoids both.
- **A pushed `FUNDING.yml` does NOT show the Sponsor button.** The repo's Settings → Features →
  **Sponsorships** toggle must also be ON. There is **no API** for it (the REST `has_sponsorships`
  field is silently ignored); it's UI-only, or flip it via an authenticated browser POST to
  `/<owner>/<repo>/settings/update` with `enable_repository_funding_links=1`. See
  `skills/chanmeng-professional-repo-docs/references/post-setup.md`.
- **The scaffold won't clobber existing files** by design. To intentionally overwrite, pass
  `--force`. Don't add "always overwrite" behavior — non-destructiveness is a core guarantee.
- **`.gitignore` must not ignore `*.svg`** — the brand logo is a tracked asset. (Some sibling skill
  repos copied a `.gitignore` that ignored svg; this one intentionally does not.)
- **The skill-creator eval harness is Unix-only** (uses POSIX `select()` on pipes → `WinError 10038`
  on Windows) and its trigger detector bails on the first non-Skill tool, under-counting multi-step
  skills. To measure triggering on Windows, run `claude -p` directly and check for a `Skill` tool
  call with `skill: chanmeng-professional-repo-docs`.

## Reading Order

1. `README.md` — what the skill is and how to install/use it
2. This `AGENTS.md` — how to work in the repo
3. `skills/chanmeng-professional-repo-docs/SKILL.md` — the skill's own instructions and workflow
4. `CONTRIBUTING.md` — contribution workflow and quality gates

## Conventions for Changes

- Follow [Conventional Commits](https://www.conventionalcommits.org/).
- After editing `scripts/scaffold.mjs` or any `assets/` template, run the local smoke test above (and
  trust `.github/workflows/validate.yml` to re-check on push).
- If you add a new generated file or template placeholder, update `SKILL.md`'s "What gets generated"
  table and this file.
