#!/usr/bin/env node
// Compares the Quincy OS Design System's tokens.json with Cobalt's src/tokens/index.css.
//
//   node scripts/ds-tokens-diff.mjs <path/to/tokens.json> [--json] [--check]
//
// Prints three lists: tokens whose values differ, tokens only in the design system, and
// tokens only in Cobalt. --json prints the same as JSON (for the sync task). --check exits 1
// when anything differs. Theme mapping: the design system's first theme ("default") is
// Cobalt's dark `:root` values; "light" is Cobalt's [data-theme="light"] block.
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
const tokensPath = args.find((a) => !a.startsWith('--'))
if (!tokensPath) {
  console.error('Usage: node scripts/ds-tokens-diff.mjs <path/to/tokens.json> [--json] [--check]')
  process.exit(2)
}

/** Normalises a CSS value so formatting differences don't count: case, spaces, `{alias}`. */
export function norm(value) {
  return String(value)
    .replace(/\{([A-Za-z0-9_.-]+)\}/g, 'var(--$1)')
    .replace(/\s+/g, ' ')
    .replace(/\s*,\s*/g, ',')
    .replace(/\(\s+/g, '(')
    .replace(/\s+\)/g, ')')
    .trim()
    .toLowerCase()
}

/** Cobalt tokens as { name: { dark, light } } from src/tokens/index.css. */
function readCobalt() {
  const css = readFileSync(resolve(ROOT, 'src/tokens/index.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '')
  const out = {}
  for (const [, selector, body] of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const light = selector.includes('[data-theme="light"]')
    const base = !light && (selector.includes(':root') || selector.includes('[data-theme="dark"]'))
    if (!light && !base) continue
    for (const [, name, value] of body.matchAll(/--([A-Za-z0-9_-]+)\s*:\s*([^;]+);/g)) {
      out[name] ??= {}
      out[name][light ? 'light' : 'dark'] = value.trim()
    }
  }
  return out
}

/** Design-system tokens as { name: { dark, light } } from its tokens.json. */
function readDesignSystem(path) {
  const t = JSON.parse(readFileSync(path, 'utf8'))
  const first = t.color?.themes?.[0]?.id ?? 'default'
  const out = {}
  for (const [family, group] of Object.entries(t)) {
    if (family === 'type' || !group || !Array.isArray(group.tokens)) continue
    for (const tok of group.tokens) {
      const v = tok.value
      // Only color and shadow can hold a value per theme in the design-system format; any
      // other family has one value, so its light theme isn't compared (`themed: false`).
      const themed = family === 'color' || family === 'shadow'
      out[tok.name] =
        v && typeof v === 'object' ? { dark: v[first], light: v.light ?? v[first], themed } : { dark: v, themed }
    }
  }
  for (const [key, stack] of Object.entries(t.type?.families ?? {})) out[`font-${key}`] = { dark: stack, themed: false }
  return out
}

const cobalt = readCobalt()
const ds = readDesignSystem(resolve(tokensPath))
const changed = []
const onlyDesignSystem = []
const onlyCobalt = []

for (const [name, d] of Object.entries(ds)) {
  const c = cobalt[name]
  if (!c) {
    onlyDesignSystem.push(name)
    continue
  }
  // A token with no light override in Cobalt inherits its dark value, same as the design system.
  const cLight = c.light ?? c.dark
  const dLight = d.light ?? d.dark
  if (norm(c.dark) !== norm(d.dark)) changed.push({ name, theme: 'dark', cobalt: c.dark, designSystem: d.dark })
  if (d.themed && norm(cLight) !== norm(dLight))
    changed.push({ name, theme: 'light', cobalt: cLight, designSystem: dLight })
}
for (const name of Object.keys(cobalt)) if (!ds[name]) onlyCobalt.push(name)

const result = { changed, onlyDesignSystem, onlyCobalt }
if (args.includes('--json')) {
  console.log(JSON.stringify(result, null, 2))
} else {
  console.log(`Changed (${changed.length})`)
  for (const c of changed) console.log(`  --${c.name} [${c.theme}]  cobalt: ${c.cobalt}  ·  design system: ${c.designSystem}`)
  console.log(`Only in the design system (${onlyDesignSystem.length}): ${onlyDesignSystem.join(', ') || '—'}`)
  console.log(`Only in Cobalt (${onlyCobalt.length}): ${onlyCobalt.join(', ') || '—'}`)
}
if (args.includes('--check') && (changed.length || onlyDesignSystem.length || onlyCobalt.length)) process.exit(1)
