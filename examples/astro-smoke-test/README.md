# Cobalt × Astro — zero-JS smoke test

Proves that `@q-labs/cobalt` renders to **static HTML with zero client
JavaScript** inside an Astro site. Because every Cobalt component is purely
presentational (no hooks, state, context, or browser APIs), Astro
server-renders them and ships no component JS — no islands required.

## What's here

- `astro.config.mjs` — static output + `@astrojs/react` so React components
  can be authored inside `.astro` pages.
- `src/layouts/Base.astro` — imports `@q-labs/cobalt/styles.css` once and sets
  `data-theme="dark"` on `<html>` (no `<CobaltProvider>` needed in `.astro`).
- `src/pages/index.astro` — uses several Cobalt components with **no
  `client:*` directive**.
- `verify-zero-js.mjs` — asserts the build emitted zero `.js` files.

## Run it

This example depends on the local library via `file:../..`, so build the
library first:

```bash
# from the repo root
npm ci && npm run build

# then, in this directory
cd examples/astro-smoke-test
npm install
npm run build          # astro build → dist/
npm run verify:zero-js # asserts no client JS was emitted
```

A passing run prints:

```
✓ Zero client JS shipped. 1 static HTML page(s) emitted.
```

## When you DO need an island

If a future component becomes genuinely interactive (open/close state, focus
management, etc.), hydrate only that one:

```astro
<MyInteractiveThing client:visible />
```

Everything else stays static.
