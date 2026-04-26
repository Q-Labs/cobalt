## Summary

<!-- What does this PR do? Which component(s) does it add or change? -->

## Red → Green → Refactor checklist

- [ ] **Red:** Test file written first — `vitest run` fails before implementation
- [ ] **Green:** Implementation written — all tests pass
- [ ] **Refactor:** Code cleaned up — tests still pass

## Component checklist (for new components)

- [ ] `ComponentName.tsx` — implementation complete
- [ ] `ComponentName.module.css` — only uses `var(--token)` values, no hardcoded values
- [ ] `ComponentName.test.tsx` — 100% branch coverage for all variant props
- [ ] `ComponentName.stories.tsx` — Default story + one story per variant
- [ ] `index.ts` — component and props interface exported
- [ ] Added to parent `index.ts` and `src/index.ts`

## CI checks

- [ ] `vitest run --coverage` passes at 100%
- [ ] `tsc --noEmit` passes
- [ ] `vite build` passes
- [ ] Storybook builds without errors

## Visual review

<!-- Link to Storybook story, or screenshot showing the component in dark + light mode -->
