# Post-setup: the two steps that aren't files

After scaffolding the docs, two things still need doing — and neither is a committable file. Surface
both in the hand-off, and offer to run the first.

## 1. Enable GitHub Discussions

One command (needs `gh` authenticated as the repo owner):

```bash
gh api -X PATCH repos/<owner>/<repo> -f has_discussions=true
```

Verify: `gh api repos/<owner>/<repo> --jq '.has_discussions'` → `true`. The issue-template
`config.yml` points questions at the Discussions tab, so this should be on.

## 2. Enable the Sponsor button (the big gotcha)

**Adding `.github/FUNDING.yml` is NOT enough to show the "Sponsor this project" button.** The repo
also needs its **Sponsorships feature toggle** turned on:

> GitHub repo → **Settings → General → Features → check "Sponsorships"**.

Key facts (learned standardizing 107 repos):
- When you add FUNDING.yml through GitHub's **web editor**, the toggle is auto-enabled.
- When you add FUNDING.yml via **`git push`** (or this scaffold), the toggle is **NOT** auto-enabled —
  so the button stays hidden despite a perfect FUNDING.yml.
- There is **no REST/GraphQL API** for the toggle (`has_sponsorships` in a repos PATCH is silently
  ignored). It is web-UI only.

### How to flip it
- **Simplest:** open the repo's Settings → Features and tick **Sponsorships** (it auto-saves).
- **At scale / via automation:** drive it through an authenticated github.com browser session. The
  checkbox auto-saves via `POST /<owner>/<repo>/settings/update` with form field
  `enable_repository_funding_links=1` plus the page's `authenticity_token` (and `_method=put`). That
  field shares a form with `archive_program_opt_out_enabled` ("Preserve this repository") — serialize
  the form faithfully (include hidden inputs; include checkboxes only when checked) so you flip
  funding ON without disturbing the archive setting.

### Verify
- **Public repo:** load the repo page and look for `/sponsors/ChanMeng666` or
  `buymeacoffee.com/chanmeng66u` in the HTML, or just check the sidebar for the Sponsor button.
- **Private repo:** check via the authenticated Settings → Features page (curl can't see it).

## Don't auto-commit

This skill creates files only. Let the user review, then commit with a Conventional Commit
(`docs: add professional repo documentation`) and push when they're ready.
