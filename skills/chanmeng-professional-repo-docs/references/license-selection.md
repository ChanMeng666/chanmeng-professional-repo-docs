# Choosing a license

Suggest a license from the project type, give a one-line rationale, and let the user confirm.
All texts are bundled in `assets/licenses/` and copied **verbatim** (the scaffold only fills the
copyright line with the year + "Chan Meng").

## Quick decision map

| Project type | Suggest | Why |
|---|---|---|
| App / tool / framework / general software | **MIT** | Simplest, maximum adoption, minimal restrictions. The default. |
| Library that should keep derivatives open | **LGPL-3.0** | "Weak" copyleft — usable by closed-source software, but modifications to the library stay open. |
| SaaS / hosted web service | **AGPL-3.0** | GPL + network clause: users interacting over a network must be able to get the source. |
| Enterprise / patent-sensitive | **Apache-2.0** | Explicit patent grant + contribution terms; enterprise-friendly. |
| Must stay open forever (incl. derivatives) | **GPL-3.0** | Strong copyleft; derivatives must also be GPL. |
| Content, docs, creative writing, designs | **CC-BY-4.0** | Creative Commons Attribution — for non-code works that others may reuse with credit. |
| Data sets / public-domain dedication | **CC0-1.0** | Waives copyright; closest to public domain. |

## Notes

- **Default to MIT** for code when unsure — it is the most common in Chan Meng's repos and the most
  permissive/adoptable.
- **Never put MIT on creative/content work** (a novel, a CV, prose, a diagram collection). Use
  CC-BY-4.0, or leave unlicensed if the user wants all rights reserved. (This was a real correction
  during the 107-repo standardization: private creative repos got CC-BY-4.0, not MIT.)
- If the project is a **fork or contains third-party code** under another license, keep/repect that
  license — don't slap a new one on. Flag it for the user.
- If the user is unsure and the repo is private/personal, it's fine to **leave it unlicensed** (default
  copyright = all rights reserved) rather than guess.

Apply with `node scaffold.mjs --license <SPDX>` where SPDX ∈
`MIT, Apache-2.0, GPL-3.0, AGPL-3.0, LGPL-3.0, CC-BY-4.0, CC0-1.0`.
