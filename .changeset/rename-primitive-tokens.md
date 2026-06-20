---
"@q-labs/cobalt": minor
---

BREAKING: rename primitive CSS custom properties to drop the `--cobalt-` namespace so they match the Quincy OS design spec, and add a `--gradient-brand` token.

Primitive renames (semantic tokens like `--bg-base`, `--text-primary`, `--accent-default` are unchanged):

- `--cobalt-black-{50…950}` → `--black-{50…950}`
- `--cobalt-blue-{50…950}` → `--cobalt-{50…950}`
- `--cobalt-crimson-{50…900}` → `--crimson-{50…900}`
- `--cobalt-silver-{50…900}` → `--silver-{50…900}`
- `--cobalt-white` / `--cobalt-off-white` / `--cobalt-cream` → `--white` / `--off-white` / `--cream`
- `--cobalt-font-*` → `--font-*`
- `--cobalt-text-*` → `--text-*`
- `--cobalt-weight-*` → `--weight-*`
- `--cobalt-leading-*` → `--leading-*`
- `--cobalt-tracking-*` → `--tracking-*`
- `--cobalt-space-*` → `--space-*`
- `--cobalt-radius-*` → `--radius-*`

New: `--gradient-brand` is defined in both the dark and light token blocks.

This is a breaking change for anyone referencing the old `--cobalt-*` primitive names directly. Released as a pre-1.0 minor bump.
