# Chip

A pill-shaped toggle button for filtering a list, with an optional count.

**Use it for** filters that narrow what's shown ("All 8", "High 2"). For tags that only label something, use `Tag`; for status, use `Badge`.

**Rules**
- A Chip is a `<button>` with `aria-pressed`, so its on/off state is announced. It never submits a form.
- Group related chips in an element with `role="group"` and an `aria-label` ("Filter by priority").
- Selected: `--accent-subtle` fill and `--border-accent` border, with the count in `--text-accent`. Don't rely on color alone: the selected chip's label also turns `--text-primary`.
- Disable a chip whose filter would show nothing, rather than hiding it.
- Short labels: one or two words, sentence case.

**Props**: everything a native `<button>` takes, plus `selected?: boolean` and `count?: number | string`.

**You provide**: the selection state (usually one active filter in your own `useState`) and the click handler.

Source: `@q-labs/cobalt` 0.3.0 (`atoms/Chip`).
