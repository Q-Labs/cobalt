// Asserts that the Astro build ships ZERO JavaScript to the browser.
//
// What matters is not whether a .js chunk exists on disk, but whether any
// HTML page references one. With the React renderer installed, Astro emits an
// unused React client chunk during its build phase, but because no page uses a
// `client:*` directive, no <script> tag is ever written into the HTML — so the
// browser downloads no JS. This script parses every built HTML file and fails
// if any <script> tag is present.
//
// Run `npm run build` first, then `npm run verify:zero-js`.
import { readdirSync, statSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const DIST = new URL('./dist/', import.meta.url).pathname

function walk(dir) {
  const out = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) out.push(...walk(full))
    else out.push(full)
  }
  return out
}

let files
try {
  files = walk(DIST)
} catch {
  console.error('✗ No dist/ found. Run `npm run build` first.')
  process.exit(1)
}

const htmlFiles = files.filter((f) => f.endsWith('.html'))
if (htmlFiles.length === 0) {
  console.error('✗ No HTML pages found in dist/. Did the build run?')
  process.exit(1)
}

let failed = false
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8')
  const scripts = html.match(/<script\b[^>]*>/gi) ?? []
  if (scripts.length > 0) {
    failed = true
    console.error(`✗ ${file.slice(DIST.length)} references ${scripts.length} <script> tag(s):`)
    for (const s of scripts) console.error('  ' + s)
  }
}

if (failed) process.exit(1)
console.log(`✓ Zero client JS shipped. ${htmlFiles.length} static HTML page(s), no <script> tags.`)
