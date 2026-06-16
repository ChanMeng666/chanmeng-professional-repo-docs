---
name: professional-repo-docs
description: >-
  Scaffold a complete set of professional, best-practice GitHub repository documentation for a
  project — README (agent-first), LICENSE, .github/FUNDING.yml, CODE_OF_CONDUCT.md, CONTRIBUTING.md,
  SECURITY.md, SUPPORT.md, GOVERNANCE.md, CHANGELOG.md, CITATION.cff, issue templates,
  PULL_REQUEST_TEMPLATE.md, AGENTS.md, and llms.txt. Use this whenever the user starts a new repo or
  wants to make an existing one look professional, polished, or "open-source ready" — e.g. "set up
  the docs for my new project", "add a README and license", "make this repo professional", "add
  community health files", "scaffold CONTRIBUTING / SECURITY / code of conduct", "prep this for
  GitHub", "add issue and PR templates", "create an AGENTS.md", "wire up GitHub Sponsors / FUNDING" —
  even when they don't name the specific files. This is Chan Meng's house style: it brands the README
  with her personal block, writes the README agent-first (so visitors point their AI agent at it),
  picks an appropriate license by project type, and copies canonical CODE_OF_CONDUCT / LICENSE text
  verbatim. It only adds files that are missing and never clobbers good existing docs.
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# Professional Repo Docs

> **Trigger me when** the user wants to set up, polish, or professionalize a GitHub repo's docs — new
> project bootstrap, "add a README / license / contributing guide", "community health files", "make
> this repo look professional", "prep for open source", "add issue/PR templates", "AGENTS.md",
> "wire up Sponsors" — even if they don't list the files.

This skill turns any project folder into a professional, agent-first GitHub repository by adding the
full set of standard documentation. It encodes hard-won conventions so you don't re-derive them and
**never regenerates filter-sensitive canonical text** (license + code of conduct are copied verbatim).

## Core principles (read before running)

1. **Copy canonical text verbatim.** `LICENSE` and `CODE_OF_CONDUCT.md` come from bundled files in
   `assets/` — never hand-write or "improve" them. (Regenerating a Contributor Covenant once tripped
   an output content filter; copying the file avoids that entirely and is also more correct.)
2. **Idempotent & non-destructive.** Only create files that are **missing**. Never clobber a README,
   LICENSE, or doc the user already wrote. The one exception is `.github/FUNDING.yml`, which is always
   (re)written so the Sponsor link stays wired.
3. **Agent-first README.** Every README opens with a notice telling humans to let their AI agent read
   it, and the repo gets an `AGENTS.md`. This is the whole point — these repos are meant to be operated
   by agents (Claude Code, Copilot, Cursor).
4. **Brand it.** Every README ends with Chan Meng's personal-brand block and a bundled
   `chan-meng-logo.svg` under `.github/brand/`.
5. **Don't commit or push.** Generate files, stage nothing destructive, and let the user review and
   commit. Printing the post-setup steps (Discussions + Sponsor toggle) is part of the job.

## The fast path: run the scaffold script

`scripts/scaffold.mjs` does detection + rendering + placement in one shot (Node, cross-platform). It
detects the git owner/repo/branch, the stack (npm/pip/go/cargo/flutter/static) for real build
commands, the project name and description, and writes every doc — skipping ones that already exist.

```bash
# from inside the target repo (or pass --dir)
node <skill-dir>/scripts/scaffold.mjs --readme lite --license MIT
```

Useful flags: `--dir <path>` · `--readme full|lite|none` · `--license <SPDX>` ·
`--name/--owner/--repo/--branch/--description <…>` · `--citation` · `--no-llms` · `--no-agents` ·
`--force` (overwrite existing). Run with no flags for sensible defaults (lite README, MIT, llms +
agents on).

## Workflow (drive it interactively)

### 1. Detect context
Confirm you're in the target repo. Note the git remote owner/repo, default branch, primary
language/stack, project name, description, and which standard files already exist
(`Glob`/`Bash`). The script auto-detects all of this, but eyeball it so the README/AGENTS content is
accurate.

### 2. Choose the license (ask, don't assume)
Read `references/license-selection.md` and **suggest** a license from the detected project type, then
confirm with the user before applying. Quick map:
software/app/tool → **MIT** · library wanting copyleft → **LGPL-3.0** · SaaS/web service →
**AGPL-3.0** · enterprise/patent-sensitive → **Apache-2.0** · must-stay-open → **GPL-3.0** ·
content/docs/creative writing → **CC-BY-4.0** · data/public-domain → **CC0-1.0**.
Give a one-line rationale with the suggestion. Pass the choice as `--license <SPDX>`.

### 3. Pick README depth (ask)
- **lite** (default): streamlined essentials — intro, features, getting started, usage, contributing,
  license, brand block. Good for most projects.
- **full**: the complete rich template (badges, TOC, architecture with Mermaid, deployment, usage
  guide, sponsor section) pre-filled with detected info + clearly-marked placeholders.
See `references/readme-guide.md` for the section catalog and how to fill placeholders.

### 4. Run the scaffold
Run `scaffold.mjs` with the chosen `--readme` and `--license`. Add `--citation` for
research/academic projects (generates `CITATION.cff`). It places everything and prints a Created /
Kept report.

### 5. Fill the placeholders
The generated README and `AGENTS.md` contain `<!-- … -->` placeholders and `_italic prompts_`.
Fill them using what you know about the project (features, architecture, real usage examples,
gotchas). This is where the project-specific quality comes from — don't leave the scaffold raw if you
have the context to complete it. See `references/agent-first-spec.md` for what makes a good
`AGENTS.md`.

### 6. Post-setup (not files)
Print and offer to run the two non-file steps (see `references/post-setup.md`):
- **Enable Discussions:** `gh api -X PATCH repos/<owner>/<repo> -f has_discussions=true`
- **Enable the Sponsor button:** turn ON Settings → Features → **"Sponsorships"**. This has **no
  API** and is **not** auto-enabled by pushing `FUNDING.yml` — without it the Sponsor button won't
  show. (This was the single biggest gotcha when standardizing Chan Meng's 107 repos.)

### 7. Hand off
Summarize what was created vs kept. **Do not commit or push** — let the user review first. If they
ask you to commit, use [Conventional Commits](https://www.conventionalcommits.org/) (e.g.
`docs: add professional repo documentation`).

## What gets generated

| File | Source | Notes |
|------|--------|-------|
| `README.md` | `assets/README-{lite,full}.md.tmpl` | agent notice on top, brand block at bottom |
| `LICENSE` | `assets/licenses/LICENSE-<SPDX>.txt` | verbatim; copyright line filled |
| `.github/FUNDING.yml` | `assets/FUNDING.yml` | `github: ChanMeng666` + `buy_me_a_coffee: chanmeng66u`; always wired |
| `CODE_OF_CONDUCT.md` | `assets/CODE_OF_CONDUCT.md` | Contributor Covenant 2.1, verbatim; contact `chanmeng.dev@gmail.com` |
| `CONTRIBUTING.md` | `assets/CONTRIBUTING.md.tmpl` | real per-stack build/test commands |
| `SECURITY.md` | `assets/SECURITY.md.tmpl` | private reporting to `chanmeng.dev@gmail.com` |
| `SUPPORT.md` | `assets/SUPPORT.md.tmpl` | Issues vs Discussions guidance |
| `GOVERNANCE.md` | `assets/GOVERNANCE.md.tmpl` | honest solo-maintainer model |
| `CHANGELOG.md` | `assets/CHANGELOG.md.tmpl` | Keep a Changelog + SemVer |
| `CITATION.cff` | `assets/CITATION.cff.tmpl` | optional (`--citation`) for research |
| `.github/ISSUE_TEMPLATE/*` | `assets/ISSUE_TEMPLATE/` | bug_report, feature_request, config |
| `.github/PULL_REQUEST_TEMPLATE.md` | `assets/PULL_REQUEST_TEMPLATE.md` | |
| `AGENTS.md` | `assets/AGENTS.md.tmpl` | agent-facing project guide |
| `llms.txt` | `assets/llms.txt.tmpl` | optional machine-readable project map |
| `.github/brand/chan-meng-logo.svg` | `assets/brand/` | for the README brand block |

## Reference files (read when you reach that step)

- `references/license-selection.md` — how to pick a license by project type (step 2)
- `references/readme-guide.md` — full vs lite README, section catalog, filling placeholders (step 3/5)
- `references/agent-first-spec.md` — the agent notice, what a great `AGENTS.md`/`llms.txt` contains (step 5)
- `references/doc-catalog.md` — the full professional-docs catalog (core/recommended/special tiers)
- `references/post-setup.md` — enabling Discussions + the Sponsorships toggle gotcha (step 6)

## Common mistakes

- **Regenerating the license or code of conduct.** Always copy from `assets/`. They are legal/standard
  texts — paraphrasing them is wrong and can trip output filters.
- **Clobbering an existing good README.** Default behavior keeps existing files; only use `--force`
  when the user explicitly wants a fresh overwrite.
- **Thinking FUNDING.yml is enough for the Sponsor button.** It is not — the repo's "Sponsorships"
  feature toggle must also be on (no API; UI only). Always surface this in the hand-off.
- **Leaving the README/AGENTS placeholders raw** when you have the context to fill them. The scaffold
  is a starting point; complete it.
