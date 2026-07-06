# design-sync notes

## Target project
Syncing into the **existing** Claude Design project `019dc5d9-0405-7f1a-b34a-613f095cfc3b`
("Quincy OS Design System", owner Quincy Iheme). This project is a hand-authored
**SPA-source** design system (`_ds_manifest.json` has `"source": "spa"`,
`"components": []`): static `preview/*.html` cards + `ui_kits/*/index.html` mockups +
`colors_and_type.css` tokens + a hand-built SPA (`design-canvas.jsx`, `footers.jsx`,
`tweaks-panel.jsx`) with its own root `_ds_bundle.js`.

## Decision (2026-06-29)
The user did NOT want a full /design-sync of the Cobalt library. Reasons:
- The existing project already implements most of Quincy OS visually.
- The live-component (design-sync) format needs `_ds_bundle.js` at the project root,
  which **collides** with the existing SPA `_ds_bundle.js` — a merge would risk the
  existing UI kits / design canvas.

Chosen scope: **"only the missing cards"** — author static preview HTML cards (same
format as existing `preview/*.html`, using `colors_and_type.css` tokens) for Cobalt
components not already represented, and upload them **additively** (no deletes, no
overwrites of existing files, no bundle changes).

### Cards added (group "Components")
- `preview/components-avatars.html`  — Avatar, UserBlock, StatusDot
- `preview/components-capability-stack.html` — SkillRow, ExperienceRole, ExperienceBlock, EducationEntry
- `preview/components-signals.html`   — SignalItem
- `preview/components-hero-cards.html` — Hero, FeatureCard, ProjectCard, Divider, NavBadge, Label

### If re-running
Do NOT run the full converter into this project. Keep it additive. Never overwrite the
existing `_ds_bundle.js`, `_ds_manifest.json`, `README.md`, `colors_and_type.css`,
`design-canvas.jsx`, `preview/*` (existing), `ui_kits/*`, or `assets/*`.

`config.json` deliberately **omits `shape`/`storybookConfigDir`**. Pinning `shape:
storybook` would short-circuit `/design-sync` detection straight into the full Storybook
converter path — the exact full-bundle sync that collides with the SPA `_ds_bundle.js`
above. The config also lacks the anchor metadata (`pkg`, `globalName`, reference build
path/command) a real converter re-sync needs, so it must NOT masquerade as one. The only
skill-read key kept here is `projectId` (pins the target so a re-run repairs THIS project
instead of orphaning a duplicate); `mode`/`cardsLocalDir` are custom markers for this
additive workflow. To add more cards later: author static HTML under
`cardsLocalDir/preview/` and upload additively (finalize_plan with empty `deletes`).
