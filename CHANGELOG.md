# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.1] - 2026-11-04

### Changed
- The marketplace is now named `chanmeng-professional-repo-docs`, the same as the repo, plugin and skill.
  Install with `/plugin install chanmeng-professional-repo-docs@chanmeng-professional-repo-docs`.
  If you added the old `chan-repo-docs` marketplace, remove it first:
  `/plugin marketplace remove chan-repo-docs`.
- CI now runs `claude plugin validate --strict` on the plugin and marketplace manifests.

## [0.1.0]

### Added
- Initial release of the `professional-repo-docs` Claude Code skill.
- `scaffold.mjs` engine: detects git owner/repo/branch + stack, renders templates, places files
  idempotently (only creates what's missing; always wires `.github/FUNDING.yml`).
- Bundled canonical assets: Contributor Covenant 2.1 `CODE_OF_CONDUCT.md`, seven license texts
  (MIT, Apache-2.0, GPL-3.0, AGPL-3.0, LGPL-3.0, CC-BY-4.0, CC0-1.0), `FUNDING.yml`, and the
  `chan-meng-logo.svg` brand asset.
- Templates: README (lite + full, agent-first notice on top, personal-brand block at bottom),
  CONTRIBUTING, SECURITY, SUPPORT, GOVERNANCE, CHANGELOG, CITATION.cff, AGENTS.md, llms.txt,
  issue templates (bug/feature/config), and PULL_REQUEST_TEMPLATE.
- References: license selection, README guide, agent-first spec, doc catalog, and post-setup
  (Discussions + the Sponsorships-toggle gotcha).
- `.claude-plugin/` marketplace manifest for plugin installation, plus a CI validation workflow.
