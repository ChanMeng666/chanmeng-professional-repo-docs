# Professional repo documentation catalog

The files a professional GitHub repo should have, by tier. The scaffold produces all of these
(GOVERNANCE/CITATION are situational). Locations: most live at repo **root**; templates and FUNDING
live under **`.github/`**.

## Core (every project)

| File | Purpose |
|---|---|
| `README.md` | The gateway: what it is, install, usage, links. First impression. (Agent-first here.) |
| `LICENSE` | Legal terms. Without it, default copyright = all rights reserved. |
| `CODE_OF_CONDUCT.md` | Community behavior standard (Contributor Covenant) + private reporting contact. |
| `CONTRIBUTING.md` | How to contribute: bug reports, feature requests, dev setup, PR flow, conventions. |

## Recommended (growing/public projects)

| File | Purpose |
|---|---|
| `SECURITY.md` | Private vulnerability reporting (email, not public issues), timelines, supported versions. |
| `CHANGELOG.md` | Version history in [Keep a Changelog](https://keepachangelog.com/) format + SemVer. |
| `.github/ISSUE_TEMPLATE/` | Structured bug_report + feature_request + config (links to Discussions). |
| `.github/PULL_REQUEST_TEMPLATE.md` | Standardized PR description + checklist. |
| `SUPPORT.md` | Where to get help (Issues vs Discussions) and what to expect. |
| `.github/FUNDING.yml` | Sponsor links → shows the Sponsor button (plus the Sponsorships toggle, see post-setup). |

## Special purpose (context-dependent)

| File | Purpose |
|---|---|
| `GOVERNANCE.md` | Decision-making & roles. Honest solo-maintainer model for personal projects. |
| `CITATION.cff` | Academic citation metadata → GitHub "Cite this repository" widget. Use `--citation`. |
| `AGENTS.md` | AI-agent project guide (see agent-first-spec.md). |
| `llms.txt` | Machine-readable project map for LLMs. |

## GitHub integration payoffs

- LICENSE → license badge + info panel.
- CODE_OF_CONDUCT / CONTRIBUTING / SECURITY → surfaced in the issue/PR creation UI and the
  "Community Standards" checklist under Insights.
- FUNDING.yml (+ Sponsorships toggle) → Sponsor button in the repo header.
- CITATION.cff → "Cite this repository" widget.
- Issue templates → the "New issue" chooser with your structured forms.
