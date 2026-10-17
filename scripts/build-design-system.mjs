#!/usr/bin/env node
// Builds what the Quincy OS Design System needs from Cobalt, ready to publish.
//
//   npm run build && node scripts/build-design-system.mjs [--merge <dir>]
//
// Writes design-system/dist/project/components/<Comp>/{preview.html, README.md, <Comp>.d.ts}
// for every component in design-system/components.json, plus the browser bundle block
// (dist/cobalt-block.js, dist/cobalt-block.css).
//
// --merge <dir>: <dir>/bundle.js and <dir>/bundle.css are the design system's current
// project/components/bundle.{js,css}. The previous Cobalt block is cut off and the new one
// appended, so the system's own code stays byte for byte; the merged files land at
// dist/project/components/bundle.{js,css}. See design-system/SYNC.md.
import { build } from 'esbuild'
import { execSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync, copyFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DS = join(ROOT, 'design-system')
const OUT = join(DS, 'dist')
const COMPONENTS_OUT = join(OUT, 'project', 'components')
const fail = (msg) => {
  console.error(`build-design-system: ${msg}`)
  process.exit(1)
}

const mergeAt = process.argv.indexOf('--merge')
const mergeDir = mergeAt === -1 ? null : process.argv[mergeAt + 1]
if (mergeAt !== -1 && !mergeDir) fail('--merge needs a directory holding the current bundle.js and bundle.css')
if (mergeDir && resolve(mergeDir).startsWith(OUT)) fail('--merge directory must be outside design-system/dist (it is cleared on every build)')

const config = JSON.parse(readFileSync(join(DS, 'components.json'), 'utf8'))
const { namespace, components } = config
const names = components.map((c) => c.name)
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'))
let sha = 'unknown'
try {
  sha = execSync('git rev-parse --short HEAD', { cwd: ROOT }).toString().trim()
} catch {}
const stamp = `@q-labs/cobalt@${pkg.version} (${sha})`

// 1. Check every component has its card files and built types.
for (const { name, source } of components) {
  const card = join(DS, 'components', name)
  if (!existsSync(join(ROOT, source))) fail(`${name}: source ${source} not found`)
  if (!existsSync(join(card, 'preview.html'))) fail(`${name}: missing design-system/components/${name}/preview.html`)
  if (!existsSync(join(card, 'README.md'))) fail(`${name}: missing design-system/components/${name}/README.md`)
  if (!readFileSync(join(card, 'preview.html'), 'utf8').startsWith('<!-- @dsCard '))
    fail(`${name}: preview.html must start with an <!-- @dsCard … --> line`)
  const dts = join(ROOT, 'dist', 'esm', source.replace(/^src\//, '').replace(/\.tsx$/, '.d.ts'))
  if (!existsSync(dts)) fail(`${name}: ${dts} not found — run \`npm run build\` first`)
}

// 2. Bundle the components as one classic script on the page's React globals.
const globals = {
  name: 'react-globals',
  setup(b) {
    b.onResolve({ filter: /^react(-dom)?(\/jsx-runtime)?$/ }, (a) => ({ path: a.path, namespace: 'react-globals' }))
    b.onLoad({ filter: /.*/, namespace: 'react-globals' }, (a) => ({
      loader: 'js',
      contents:
        a.path === 'react/jsx-runtime'
          ? 'const R=window.React;export const Fragment=R.Fragment;export function jsx(t,p,k){const{children,...r}=p||{};if(k!==undefined)r.key=k;return children===undefined?R.createElement(t,r):R.createElement(t,r,children)};export const jsxs=jsx;'
          : `module.exports=window.${a.path === 'react' ? 'React' : 'ReactDOM'}`,
    }))
  },
}
const entry =
  components.map((c, i) => `import C${i} from ${JSON.stringify(join(ROOT, c.source))}`).join('\n') +
  `\nconst ns = (window[${JSON.stringify(namespace)}] = window[${JSON.stringify(namespace)}] || {})\n` +
  `Object.assign(ns, { ${components.map((c, i) => `${c.name}: C${i}`).join(', ')} })\n`

rmSync(OUT, { recursive: true, force: true })
mkdirSync(COMPONENTS_OUT, { recursive: true })
const result = await build({
  stdin: { contents: entry, resolveDir: ROOT, loader: 'ts', sourcefile: 'design-system-entry.ts' },
  bundle: true,
  format: 'iife',
  target: 'es2018',
  jsx: 'automatic',
  minifyWhitespace: true,
  minifySyntax: true, // class names stay readable and component-scoped (e.g. .Chip_chip)
  legalComments: 'none',
  loader: { '.module.css': 'local-css' },
  outdir: join(OUT, 'tmp'),
  write: false,
  plugins: [globals],
  logLevel: 'warning',
})
const jsOut = result.outputFiles.find((f) => f.path.endsWith('.js')).text.trim()
const cssOut = result.outputFiles.find((f) => f.path.endsWith('.css')).text.trim()

const jsBlock =
  `// ── Cobalt components · synced from ${stamp} ──\n` +
  `// managed: ${names.join(',')}\n` +
  `// Built by scripts/build-design-system.mjs in q-labs/cobalt; replaced whole on every sync — edit Cobalt, not this block.\n` +
  `try {\n${jsOut}\n} catch (e) { var __qos = (window[${JSON.stringify(namespace)}] = window[${JSON.stringify(namespace)}] || {}); ` +
  `(__qos.__errors = __qos.__errors || []).push({ path: "cobalt", error: String((e && e.message) || e) }); }\n`
const cssBlock = `/* ── Cobalt components · synced from ${stamp} ── */\n${cssOut}\n`

// The design system inlines these files into pages: they must not end or escape the element.
for (const [label, text] of [['JS', jsBlock], ['CSS', cssBlock]]) {
  if (/<\/script|<!--/i.test(text)) fail(`${label} block contains </script or <!--`)
  if (/<\/style/i.test(text)) fail(`${label} block contains </style`)
  if (/\beval\(|new Function/.test(text)) fail(`${label} block uses eval`)
}
writeFileSync(join(OUT, 'cobalt-block.js'), jsBlock)
writeFileSync(join(OUT, 'cobalt-block.css'), cssBlock)

// 3. Cards, guidelines and types.
for (const { name, source } of components) {
  const dir = join(COMPONENTS_OUT, name)
  mkdirSync(dir, { recursive: true })
  copyFileSync(join(DS, 'components', name, 'preview.html'), join(dir, 'preview.html'))
  copyFileSync(join(DS, 'components', name, 'README.md'), join(dir, 'README.md'))
  const dts = readFileSync(join(ROOT, 'dist', 'esm', source.replace(/^src\//, '').replace(/\.tsx$/, '.d.ts')), 'utf8')
  writeFileSync(join(dir, `${name}.d.ts`), dts.replace(/import\("react\/jsx-runtime"\)\.JSX\.Element/g, 'React.JSX.Element'))
}

// 4. Optional: merge into the design system's current bundle.
if (mergeDir) {
  for (const f of ['bundle.js', 'bundle.css'])
    if (!existsSync(join(mergeDir, f))) fail(`--merge: ${join(mergeDir, f)} not found (save the design system's current project/components/${f} there)`)
  const js = readFileSync(join(mergeDir, 'bundle.js'), 'utf8')
  const css = readFileSync(join(mergeDir, 'bundle.css'), 'utf8')
  const nl = js.indexOf('\n')
  const header = js.slice(0, nl)
  if (!header.startsWith('/* @ds-bundle: ') || !header.endsWith(' */')) fail('bundle.js line 1 is not an @ds-bundle header')
  const meta = JSON.parse(header.slice('/* @ds-bundle: '.length, -' */'.length))

  // Everything from the first "// ── Cobalt" line on is the previous Cobalt block (always last).
  let body = js.slice(nl + 1)
  const at = body.search(/^\/\/ ── Cobalt /m)
  let previous = []
  if (at !== -1) {
    const old = body.slice(at)
    const managed = /^\/\/ managed: (.+)$/m.exec(old)
    const legacy = /^\/\/ ── Cobalt [^:\n]*: ([^─\n]+) ──/m.exec(old) // first hand-built block
    previous = (managed ? managed[1].split(',') : legacy ? legacy[1].split(',') : []).map((s) => s.trim()).filter(Boolean)
    body = body.slice(0, at)
  }
  const kept = (meta.components ?? []).filter((c) => !previous.includes(c.name) && !names.includes(c.name))
  meta.components = [...kept, ...names.map((name) => ({ name }))]
  const mergedJs = `/* @ds-bundle: ${JSON.stringify(meta)} */\n${body.replace(/\n+$/, '\n')}\n${jsBlock}`

  const cssAt = css.search(/^\/\* ── Cobalt /m)
  const cssBody = cssAt === -1 ? css : css.slice(0, cssAt)
  const mergedCss = `${cssBody.replace(/\n+$/, '\n')}\n${cssBlock}`

  writeFileSync(join(COMPONENTS_OUT, 'bundle.js'), mergedJs)
  writeFileSync(join(COMPONENTS_OUT, 'bundle.css'), mergedCss)
  console.log(`Merged bundle: kept ${kept.length} other component(s), replaced ${previous.length}, now ${names.length} Cobalt component(s).`)
}

console.log(`Built ${names.length} components from ${stamp} → ${OUT}`)
