# Skeleton

A grey placeholder shape shown while content loads, matching the layout it stands in for.

**Use it for** loads longer than about 300ms where you know the shape of what's coming (a card, a row, an avatar). For an action in progress, put a spinner in the button instead.

**Rules**
- Compose skeletons in the same layout as the real content so nothing jumps when it arrives.
- Variants: `text` (12px bar, use `lines` for a paragraph whose last line is shorter), `block` (4:3 image area on `--bg-raised`), `circle` (40px avatar).
- Skeletons are hidden from screen readers. Mark the loading region itself with `aria-busy="true"` and a label.
- Pulses gently; stays still when the user prefers reduced motion.

**Props**: `variant?: 'text' | 'block' | 'circle'`, `width?`, `height?` (numbers are px, strings any CSS length), `lines?`, plus standard div attributes.

**You provide**: the surrounding layout and the `aria-busy` region.

Source: `@q-labs/cobalt` 0.3.0 (`atoms/Skeleton`).
