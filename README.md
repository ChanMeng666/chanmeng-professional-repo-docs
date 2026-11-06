<!-- AGENT-FIRST NOTICE -->
> [!IMPORTANT]
> ### 🤖 Read this with your AI agent — don't read it by hand.
> This repo is written agent-first. Point Claude Code, GitHub Copilot, Cursor, or any agent at it:
> *"Read the README and SKILL.md, then install and use this skill."*
<!-- /AGENT-FIRST NOTICE -->

<div align="center">

# 🪄 chanmeng-professional-repo-docs

### A Claude Code skill that scaffolds professional, agent-first GitHub repository documentation

Turn any project folder into a polished, best-practice GitHub repo with one invocation — README,
LICENSE, community-health files, issue/PR templates, `AGENTS.md`, and more.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![Claude Code Skill](https://img.shields.io/badge/Claude%20Code-Skill-green?style=flat-square)](https://docs.anthropic.com/en/docs/claude-code/skills)
[![Validate](https://github.com/ChanMeng666/chanmeng-professional-repo-docs/actions/workflows/validate.yml/badge.svg)](https://github.com/ChanMeng666/chanmeng-professional-repo-docs/actions/workflows/validate.yml)
[![Sponsor](https://img.shields.io/badge/Sponsor-%E2%9D%A4-EA4AAA?style=flat-square&logo=githubsponsors)](https://github.com/sponsors/ChanMeng666)

</div>

## What it does

When installed, Claude Code can bootstrap a project's entire documentation set from a natural-language
request like *"set up the docs for my new project"* or *"make this repo professional"*. It generates:

| | |
|---|---|
| `README.md` | **lite** or **full**, agent-first notice on top, personal-brand block at bottom |
| `LICENSE` | chosen by project type (MIT, Apache-2.0, GPL/AGPL/LGPL-3.0, CC-BY-4.0, CC0-1.0) |
| `.github/FUNDING.yml` | wired to GitHub Sponsors + Buy Me a Coffee |
| `CODE_OF_CONDUCT.md` | Contributor Covenant 2.1 (copied verbatim) |
| `CONTRIBUTING.md` | with real per-stack build/test commands |
| `SECURITY.md` · `SUPPORT.md` · `GOVERNANCE.md` · `CHANGELOG.md` | community-health set |
| `CITATION.cff` | optional, for research/academic projects |
| `.github/ISSUE_TEMPLATE/*` · `PULL_REQUEST_TEMPLATE.md` | structured contribution templates |
| `AGENTS.md` · `llms.txt` | agent-facing project guides |

**Principles:** copies canonical license/CoC text verbatim (never regenerates it), only creates files
that are **missing** (never clobbers your work), brands every README, and never auto-commits.

## Prerequisites

- **Node.js 18+** (the `scaffold.mjs` engine is plain Node, cross-platform).
- **`gh` CLI** (optional) — only for the post-setup step that enables Discussions.

## Installation

Pick **one** method.

### Any agent, with the skills CLI

Installs into Claude Code, Cursor, Codex, GitHub Copilot, Gemini CLI and the other agents the CLI supports. Listed on [skills.sh](https://skills.sh/chanmeng666).

```bash
npx skills add ChanMeng666/chanmeng-professional-repo-docs
```

### Method 1 — Claude Code plugin marketplace (recommended)

```text
/plugin marketplace add ChanMeng666/chanmeng-professional-repo-docs
/plugin install chanmeng-professional-repo-docs@chanmeng-professional-repo-docs
```

### Method 2 — Git clone into your skills folder

The skill content lives at `skills/chanmeng-professional-repo-docs/`. Copy that subfolder into your
user-level skills directory:

```bash
# macOS / Linux / Windows (Git Bash or WSL)
git clone --depth 1 https://github.com/ChanMeng666/chanmeng-professional-repo-docs.git /tmp/_prd-src \
  && mv /tmp/_prd-src/skills/chanmeng-professional-repo-docs ~/.claude/skills/chanmeng-professional-repo-docs \
  && rm -rf /tmp/_prd-src
```

> **Windows PowerShell:** replace `~` with `$env:USERPROFILE` (destination
> `$env:USERPROFILE\.claude\skills\chanmeng-professional-repo-docs`), and use `Move-Item` / `Remove-Item -Recurse`.

### Method 3 — Symlink (hack on the skill live)

```bash
git clone https://github.com/ChanMeng666/chanmeng-professional-repo-docs.git
cd chanmeng-professional-repo-docs
ln -s "$(pwd)/skills/chanmeng-professional-repo-docs" ~/.claude/skills/chanmeng-professional-repo-docs
```

```powershell
# Windows PowerShell (Administrator)
New-Item -ItemType SymbolicLink `
  -Path  "$env:USERPROFILE\.claude\skills\chanmeng-professional-repo-docs" `
  -Target "$(Resolve-Path .\skills\chanmeng-professional-repo-docs)"
```

## Usage

Once installed, just ask Claude Code in your project:

> "Set up professional GitHub docs for this repo."

Claude will detect your stack, suggest a license, ask README depth (lite/full), generate everything,
and print the two post-setup steps (enable Discussions + the Sponsorships toggle).

You can also run the engine directly:

```bash
node skills/chanmeng-professional-repo-docs/scripts/scaffold.mjs --readme lite --license MIT
# flags: --dir <path> --readme full|lite|none --license <SPDX> --citation --no-llms --no-agents --force
```

## ❤️ Sponsor

[![Sponsor on GitHub](https://img.shields.io/badge/Sponsor-GitHub-EA4AAA?style=for-the-badge&logo=githubsponsors)](https://github.com/sponsors/ChanMeng666)
[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-FFDD00?style=for-the-badge&logo=buymeacoffee&logoColor=black)](https://buymeacoffee.com/chanmeng66u)

## 📄 License

Released under the [MIT](LICENSE) license.

---

<!-- CHAN MENG PERSONAL BRAND -->
<div align="center">
  <a href="https://github.com/ChanMeng666" target="_blank">
    <img src="./.github/brand/chan-meng-logo.svg" alt="Chan Meng" width="160" />
  </a>

  <p><strong>Chan Meng</strong><br/>Need a custom app like this one? I build them — let's talk.</p>

  <a href="mailto:chanmeng.dev@gmail.com"><img src="https://img.shields.io/badge/Email-chanmeng.dev@gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white" alt="Email Chan Meng"/></a>
  <a href="https://github.com/ChanMeng666"><img src="https://img.shields.io/badge/GitHub-ChanMeng666-181717?style=flat-square&logo=github&logoColor=white" alt="Chan Meng on GitHub"/></a>
</div>
<!-- /CHAN MENG PERSONAL BRAND -->
