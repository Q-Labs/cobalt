# Cobalt ↔ Quincy OS Design System sync

Cobalt (this repo) and the **Quincy OS Design System** (a Design System artifact on claude.ai,
`design-system/components.json` → `artifact`) stay in step through one daily scheduled Claude
task. That task reads this file and does what it says. Change the sync by changing this file.

## Source of truth

| Thing | Owner | The other side |
|---|---|---|
| Component code, cards (`preview.html`), guidelines (`README.md`) for components in `components.json` | **Cobalt** | Design system shows a copy. Edits made there come back as a PR. |
| Design tokens | **Cobalt** (`src/tokens/index.css`) | Design system's `tokens.json` mirrors them. Edits made there come back as a PR. |
| The brand book (`project/README.md`), legacy `preview/` cards, UI kits, logos, assets | **Design system** | Not in Cobalt. The sync never edits them, except the table between `<!-- cobalt-sync:start -->` and `<!-- cobalt-sync:end -->` in the brand book. |

Nothing is ever merged automatically. Design-system edits arrive as a PR for Quincy to review.

## Markers (how a run knows what it already did)

- **Bundle block:** `project/components/bundle.js` ends with a block whose first line is
  `// ── Cobalt components · synced from @q-labs/cobalt@<version> (<sha>) ──`. `<sha>` is the Cobalt
  commit last published.
- **Index:** every publish by the sync sets `project/design-system.json` → `lastChange` to
  `{"by": "Cobalt sync", "via": "CI · q-labs/cobalt sync", "at": <now>, "note": …, "cobaltSha": <sha>}`.
  The design system page replaces `lastChange` when someone saves an edit there, so
  **`lastChange.via` not starting with `CI · q-labs/cobalt sync` means a person edited the design
  system since the last sync.**

## Each run

Work in a fresh clone of `q-labs/cobalt` at `main`. Read the design system with the Artifact tool
(`read`, paths under `project/`), never by fetching its page. If `main` has no
`design-system/components.json`, or `npm run build:ds` fails, change nothing and report why.

1. **Read state.** Read `project/design-system.json`, `project/tokens.json`,
   `project/components/bundle.js` and `bundle.css`, and for each component in `components.json`
   its `project/components/<Comp>/preview.html` and `README.md`. Note the synced `<sha>` from the
   bundle block (none yet: treat everything as unsynced) and whether a person edited since.

2. **Design system → Cobalt (only when a person edited since the last sync).**
   - Tokens: `npm run ds:tokens-diff -- <saved tokens.json> --json`. Each `changed` entry, or
     `onlyDesignSystem` name, that differs from what Cobalt had at the synced `<sha>`
     (`git show <sha>:src/tokens/index.css`) is a design-system edit. A difference that matches
     Cobalt's history instead is a Cobalt change not yet published, handled in step 3.
   - Cards and guidelines: a `preview.html` or `README.md` that differs from
     `design-system/components/<Comp>/` at the synced `<sha>` is a design-system edit.
   - For any edits: open an issue first if there's no open one labelled `design-sync` (Cobalt's
     CLAUDE.md requires it), then commit them on branch `design-sync/from-design-system`
     (tokens into `src/tokens/index.css`, both themes; cards and guidelines into
     `design-system/components/`), add a `patch` changeset for token changes, and open or update
     ONE PR labelled `design-sync`, body `Closes #<issue>`, listing each change with its old and
     new value. If that PR is already open, push to it instead. Run `npm run typecheck` and
     `npm run test:coverage` before pushing.
   - If `<sha>` isn't in the clone's history (a squash merge can drop it), fetch it
     (`git fetch origin <sha>`); if that fails, compare against `main` instead and treat every
     difference as a person's edit. That errs toward a PR for review, never toward overwriting.
   - Do not publish the design system's own edits back to it; they're already there.

3. **Cobalt → design system (only when `main` differs from the synced `<sha>`).**
   - `npm ci && npm run build`, save the design system's current `bundle.js` and `bundle.css` to a
     folder outside the repo, then `npm run build:ds -- --merge <that folder>`.
   - Files to publish are everything under `design-system/dist/project/`, at the same paths
     under `project/`.
   - **Conflict rule:** if step 2 found a person's edit to a token, card or guideline, leave that
     item out of this publish (keep the design system's version) until the step 2 PR is merged
     or closed. Everything else publishes.
   - Tokens: for every difference `ds:tokens-diff` reports, except a person's edit from step 2,
     publish Cobalt's value: update that entry in `project/tokens.json` (read again right before;
     keep every other key, usage note and style). This also settles old drift that neither side
     made since the last sync. A token only in Cobalt is added to the matching family; a token
     only in the design system that isn't a person's edit is left alone and listed in the
     report. Color and shadow values are per theme (`default` = Cobalt dark, `light`); other
     families hold one value.
   - Brand book: if the component list changed, rewrite only the table between the
     `cobalt-sync` markers in `project/README.md` (read again right before). Add the markers
     around the existing "LIVE COMPONENTS (Cobalt)" table the first time.
   - Publish following the Design System type's own instructions: one call with the changed
     files, then the index LAST in its own call, read right before, with `lastChange` set as in
     Markers. A refused publish: re-read what it names, redo the change once, then stop and report.

4. **Report.** If nothing changed in either direction, end quietly. Otherwise end with a short
   summary: what was published, the PR opened or updated, any conflicts held back.

## Adding a component to the design system

Add it to `components.json` and create `design-system/components/<Comp>/preview.html` (first
line `<!-- @dsCard group="…" height=N subtitle="…" -->`, a root element and one script using
`window.<namespace>.<Comp>` with `React.createElement`) and `README.md` (first sentence = the
summary). `npm run build:ds` checks both exist. The next daily run publishes it.

## Known differences

- `--gradient-brand` has a separate light value in Cobalt, but the design system can only hold one
  value for that kind of token. `ds:tokens-diff` doesn't report it.
- The design system loads React 18 from its own copy; the bundle maps `react`, `react-dom` and
  `react/jsx-runtime` onto those globals.
