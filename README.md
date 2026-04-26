# Cobalt

> React component library for the Quincy OS design system by Cloud129 Technologies.

[![CI](https://github.com/qiheme/design-system/actions/workflows/ci.yml/badge.svg)](https://github.com/qiheme/design-system/actions/workflows/ci.yml)
[![Storybook](https://img.shields.io/badge/Storybook-live-FF4785?logo=storybook&logoColor=white)](https://qiheme.github.io/design-system)
[![npm](https://img.shields.io/badge/npm-%40qiheme%2Fcobalt-blue)](https://github.com/qiheme/design-system/packages)

Dark-first. Cobalt and crimson. Space Grotesk / DM Sans / JetBrains Mono.

---

## Install

Add to `.npmrc` in your project:

```
@qiheme:registry=https://npm.pkg.github.com
```

Then install:

```bash
npm install @qiheme/cobalt
```

## Usage

```tsx
import { CobaltProvider, Button, Badge } from '@qiheme/cobalt'
import '@qiheme/cobalt/dist/cobalt.css'

export default function App() {
  return (
    <CobaltProvider>
      <Button variant="primary">Launch</Button>
      <Badge variant="active">Active</Badge>
    </CobaltProvider>
  )
}
```

---

## Components

<!-- STATS:START -->
| Level | Count |
|---|---|
| Typography | 5 |
| Atoms | 11 |
| Molecules | 13 |
| Organisms | 10 |
| Templates | 4 |
| **Total** | **43** |

Coverage: **100%** · Version: **0.1.0**
<!-- STATS:END -->

### Typography
`Display` `Heading` `Body` `Label` `Mono`

### Atoms
`Button` `Badge` `Tag` `Avatar` `Input` `ProgressBar` `ProgressMini` `StatusDot` `Divider` `NavBadge` `LogoMark`

### Molecules
`NavItem` `MetricCard` `StatItem` `SignalItem` `TimelineItem` `MissionItem` `UserBlock` `ContactItem` `QuickStatRow` `SkillRow` `ExperienceRole` `EducationEntry`

### Organisms
`Card` `TopNav` `Topbar` `Hero` `ProjectCard` `FeatureCard` `Sidebar` `StatsRow` `ExperienceBlock` `StatusBar`

### Templates
`DashboardLayout` `PortfolioLayout` `ResumeLayout` `LandingLayout`

---

## Development

```bash
npm run storybook        # Component explorer on :6006
npm run test:coverage    # Run tests with 100% coverage enforcement
npm run typecheck        # TypeScript type check
npm run build            # Library build → dist/
npm run build-storybook  # Static Storybook → storybook-static/
```

## Publishing

Tag a release to trigger automatic publish to GitHub Packages:

```bash
npm version patch   # or minor / major
git push --tags
```

The `release.yml` workflow publishes `@qiheme/cobalt` to GitHub Packages automatically.

---

## Design Tokens

Import tokens directly for custom integrations:

```css
@import '@qiheme/cobalt/tokens';
```

Token categories: color primitives (`--cobalt-*`, `--crimson-*`), semantic colors (`--bg-base`, `--text-primary`, `--accent-default`), typography scale, spacing, border radius.

---

## License

MIT © Cloud129 Technologies
