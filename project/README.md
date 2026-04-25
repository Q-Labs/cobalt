# Quincy OS — Design System

**Quincy OS** is a premium personal operating system design system for Quincy Iheme (Cloud129 Technologies). It organizes priorities, timelines, progress, and decisions across work, life, and ambitious projects. The system sits at the intersection of executive dashboard, editorial typography, and minimal command center — technical but deeply human.

---

## Sources

| Source | Location | Notes |
|--------|----------|-------|
| GitHub codebase | `github.com/qiheme/cloud129-site` (private, branch: `master`) | React app, Tailwind/twin.macro, styled-components, framer-motion, feather-icons |
| Figma | *(none provided)* | — |

The codebase is a React/CRA app built on the **Treact** open-source template library. It currently renders a `HostingCloudLandingPage` demo component. The primary brand asset found is the Cloud129 "C" mark (`assets/cloud129-c.png`) in cobalt blue.

---

## File Index

```
README.md                     ← This file
colors_and_type.css           ← All CSS variables: colors, type, spacing, radius, shadows
SKILL.md                      ← Agent skill manifest

assets/
  cloud129-c.png              ← Cloud129 brand "C" mark (primary logo)
  logo-light.svg              ← Light variant wordmark
  logo-full.png               ← Full wordmark
  dot-pattern.svg             ← Background texture
  icons/                      ← github.svg, linkedin.svg, facebook.svg

preview/                      ← Design System tab cards
  colors-dark.html
  colors-light.html
  colors-semantic.html
  type-display.html
  type-body-mono.html
  spacing-radius.html
  elevation-shadows.html
  components-badges.html
  components-buttons.html
  components-cards.html
  components-progress.html
  components-nav.html
  components-metrics.html
  components-timeline.html

ui_kits/
  portfolio/                  ← Personal portfolio homepage
  dashboard/                  ← Command center dashboard
  landing/                    ← Side project landing page
  resume/                     ← Resume / Capability Stack
```

---

## CONTENT FUNDAMENTALS

**Voice:** First-person, direct, confident — never corporate or boastful. Reads like a sharp operator writing their own system documentation. The tone is self-aware without being ironic.

**Casing:**
- Headlines: Title Case for section names ("Active Missions", "Capability Stack")
- UI labels: sentence case for descriptions, ALL CAPS for status badges and system labels
- Metadata/timestamps: mono, lowercase (`v2.4.1 · updated 3d ago`)

**Copy style:**
- Short, declarative statements. No filler. No adjective stacks.
- "Ship fast. Document clearly. Iterate." not "A revolutionary approach to personal productivity."
- Verbs over nouns: "Deploy", "Track", "Review", "Signal" — not "Deployment Management System"

**OS-language terms (use in internal/stylized sections):**
- Capability Stack — resume/skills section
- Installed Modules — active tools/frameworks
- Active Missions — current projects
- Patch Notes — changelog/updates
- Control Center / Command Center — dashboard views
- Signal — alerts, notifications, broadcasts

**Emoji:** Not used in UI. System uses iconography only.

**Numbers:** Metric cards show clean integers with unit suffixes (`14 PRs`, `3 active`, `92%`). No decimal noise.

---

## VISUAL FOUNDATIONS

### Colors
Two-mode system (dark default, light supported). See `colors_and_type.css` for all tokens.

- **Dark mode backgrounds:** Near-black (`#040508` → `#111318`) — not pure black, has a very slight blue-black cast
- **Light mode backgrounds:** Off-white (`#F7F8FA` → `#FFFFFF`) — clean, no warmth, slightly cool
- **Primary accent:** Cobalt Blue (`--cobalt-500: #2563EB`) — used for CTAs, active states, links, progress fills
- **Secondary accent:** Crimson (`--crimson-500: #EF2222`) — sparingly, for danger states, urgency badges, bold editorial moments
- **Silver neutrals:** Used for borders, secondary text, and metallic surface texture cues

### Typography
Three-font system, strict role separation:
- **Space Grotesk** (700/600) — display headlines, section titles, hero text. Bold, geometric, slightly technical. Never used for body.
- **DM Sans** (400/500/600) — all UI text, body copy, labels, descriptions. Friendly, legible, neutral.
- **JetBrains Mono** (400/500) — metadata ONLY: timestamps, version numbers, status labels, file paths, numeric data. Never prose.

Headline tracking is tight (`-0.02em` to `-0.04em`). Body is default. Mono is slightly wide (`0.04em`).

### Spacing
8px base grid. All spacing values are multiples of 4px. Preferred spacings: 4, 8, 12, 16, 24, 32, 48, 64, 96.

### Backgrounds
No full-bleed gradients in UI components. Gradients only in hero sections, used as a subtle depth cue (dark-to-slightly-lighter, same hue family). Dot patterns and fine grid lines used as texture on hero/dashboard canvases. No photographic backgrounds in UI chrome.

### Borders
Subtle, low-opacity white borders in dark mode (`rgba(255,255,255,0.09)`). Cards have a 1px border + very slight shadow. No heavy drop shadows. Active/selected states use the cobalt accent border.

### Cards
- Background: `--bg-surface` or `--bg-raised`
- Border: `1px solid var(--border-default)`
- Border radius: `--radius-lg` (10px) for most cards, `--radius-md` (6px) for compact items
- Shadow: `--shadow-sm` at rest, `--shadow-md` on hover
- Hover: border brightens to `--border-strong`, shadow deepens slightly — NO color flood fills on hover

### Animations
- Framer-motion easing: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (ease-out) for entrances
- Duration: 200ms for micro-interactions, 300ms for panel reveals, 500ms for page-level transitions
- Hover states: opacity + subtle translate-Y(-2px), not color swap
- No bounces. No spring physics. Clean deceleration only.

### Hover / Press states
- **Hover:** slight background brighten + `--shadow-md` elevation lift
- **Active/Press:** subtle scale-down (`scale(0.98)`) + border snaps to accent
- **Disabled:** 40% opacity, no pointer events

### Corner radii
- Badges, chips: `--radius-full` (pill)
- Buttons: `--radius-md` (6px)
- Cards, panels: `--radius-lg` (10px)
- Modals, large overlays: `--radius-xl` (16px)
- Input fields: `--radius-md` (6px)

### Iconography (see ICONOGRAPHY section below)
Feather Icons (line style, 1.5px stroke). Available via CDN. No filled icons unless explicitly for branding.

### Imagery
Not applicable — this is a personal OS/dashboard system without product photography. Illustrations: avoided. Use data visualizations (progress rings, bar charts, timelines) instead.

---

## ICONOGRAPHY

**Source:** Feather Icons (`feather-icons` npm package, v4.26.0 in codebase)
**CDN:** `https://unpkg.com/feather-icons/dist/feather.min.js`
**Style:** Line icons, 1.5px stroke, rounded line-caps
**Sizes:** 14px (compact), 16px (default), 20px (prominent), 24px (hero/nav)
**Color:** Inherit from text context — always `currentColor`, never hardcoded

Custom brand icons in `assets/icons/`:
- `github.svg` — GitHub logo mark
- `linkedin.svg` — LinkedIn logo mark
- `facebook.svg` — Facebook logo mark

**No emoji used.** Unicode arrows (→ ← ↑) permitted in editorial contexts only.

---

## DESIGN PRINCIPLES

1. **Command, don't clutter** — every element earns its place. One decision per screen.
2. **Premium, not precious** — refined details, but never fussy or decorative for its own sake.
3. **OS flavor, human clarity** — system language in labels; plain language in descriptions.
4. **Dashboards create decisions** — metrics surfaced because they drive next actions.
5. **Modular by default** — every component works standalone and composes cleanly.

---

## ANTI-PATTERNS

- ❌ Gradient-flood backgrounds across full UI panels
- ❌ Cards with colored left-border accent only (no substance)
- ❌ Emoji in UI labels or navigation
- ❌ Pure black (`#000`) backgrounds — use `--black-950`
- ❌ More than 2 accent colors on a single screen
- ❌ Body text in Space Grotesk (display font only)
- ❌ Mono font for prose or headings
- ❌ Rounded corners > 16px on cards
- ❌ Heavy terminal aesthetics (green-on-black, ASCII borders)
- ❌ Status badges using only color to communicate meaning — always pair with label text
