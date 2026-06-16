# README guide — full vs lite, and filling placeholders

Both README templates (`assets/README-lite.md.tmpl`, `assets/README-full.md.tmpl`) share two
non-negotiable elements:

1. **Agent-first notice at the very top** (above the hero) — see `agent-first-spec.md`.
2. **Chan Meng personal-brand block at the very bottom** — the `<!-- CHAN MENG PERSONAL BRAND -->`
   block with the logo, tagline, and email/GitHub badges. Always last.

## Which depth?

- **lite** — intro, features, getting started, usage, contributing, support/sponsor, license, brand.
  Right for most projects, especially early-stage. Fast to fill.
- **full** — the complete rich structure (badges row, collapsible Table of Contents, Introduction,
  Key Features, Tech Stack, Architecture with Mermaid, Getting Started, Deployment, Usage Guide,
  Development, Contributing, Sponsor, License, Author, back-to-top). Use for flagship/public projects
  where the extra polish pays off.

The complete reference for the rich style is Chan Meng's own template at
`D:\github_repository\项目开发必备\README\README-模板示例.md` — consult it when building a `full`
README and the user wants the maximal treatment (screenshots, demo video, performance, FAQ,
troubleshooting, ecosystem, team sections).

## Filling placeholders

The scaffold substitutes `{{NAME}}`, `{{OWNER}}`, `{{REPO}}`, `{{BRANCH}}`, `{{DESCRIPTION}}`,
`{{DEVSETUP}}`, `{{LICENSE_NAME}}` automatically. What remains for you to complete:

- `_italic prompts_` and `<!-- HTML comments -->` — replace with real content.
- **Features** — turn the placeholder bullets into real, benefit-led features.
- **Architecture** (full) — replace the stub Mermaid diagram with the real high-level design.
- **Usage** — give the simplest real end-to-end example, not a stub.
- **Badges** (full) — delete badges that don't apply (e.g. CI badge if there's no CI yet); add the
  real tech-stack badges for the detected stack.
- **Link definitions** (full) — fill `[demo-link]`, `[docs-link]` or remove them.

Don't leave the README as a raw scaffold if you have the project context to complete it — the
scaffold is the skeleton, your understanding of the project is the substance.

## Style conventions (Chan Meng house style)

- Centered hero (`<div align="center">`), emoji section headers, shields.io flat-square badges.
- Sponsor badges point to `github.com/sponsors/ChanMeng666` and `buymeacoffee.com/chanmeng66u`.
- Author/contact uses `chanmeng.dev@gmail.com` and `github.com/ChanMeng666`.
- English content.
