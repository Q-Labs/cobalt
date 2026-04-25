---
name: quincy-os-design
description: Use this skill to generate well-branded interfaces and assets for Quincy Iheme / Cloud129 Technologies using the Quincy OS design system. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping or production.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick Reference

**Brand:** Quincy Iheme / Cloud129 Technologies
**System:** Quincy OS — premium personal operating system design system

**Fonts (Google Fonts):**
- `Space Grotesk` — display/headlines (700/600 only)
- `DM Sans` — body, UI labels, all prose
- `JetBrains Mono` — metadata, timestamps, status labels ONLY

**Key colors:**
- Cobalt accent: `#2563EB` (primary CTA, links, progress)
- Crimson accent: `#EF2222` (danger, urgency — use sparingly)
- Dark bg: `#040508` → `#111318`
- Text primary (dark): `#EEF0F5`
- Text secondary (dark): `#8B95A8`

**Load tokens:**
```html
<link rel="stylesheet" href="colors_and_type.css">
```

**Brand terms to use:**
- Capability Stack (not "skills" or "resume")
- Installed Modules (not "tech stack")
- Active Missions (not "projects")
- Patch Notes (not "changelog")
- Control Center / Command Center (not "dashboard")
- Signal (not "notification")

**Avoid:**
- Gradient flood fills on panels
- Emoji in UI
- Body text in Space Grotesk
- Mono font for prose
- Pure black backgrounds — use `#040508`
- More than 2 accent colors per screen
