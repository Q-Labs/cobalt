# Modal

A dialog over the page for a focused task or confirmation, as a centered panel or a bottom sheet.

**Use it for** short tasks that need the person's full attention: reviewing an item before saving, confirming a delete. Long forms or multi-step flows belong on their own page.

**Rules**
- Variants: `dialog` (centered, `--radius-xl`, `--shadow-xl`), `sheet` (docked to the bottom), `responsive` (dialog on wide screens, sheet under 640px).
- Title states the task ("Add to Holiday 2026"). Footer buttons go right: secondary first, primary last. A destructive confirm uses `--danger-default` for its primary button.
- Built-in behavior: renders in a portal on `<body>` and keeps the theme of where it's placed; focus moves to the first control inside, Tab stays inside, and focus returns to the opener on close; the rest of the page is inert and can't scroll; Esc and a scrim click close it (turn the scrim off with `closeOnScrim={false}`). With nested modals, Esc closes only the top one.
- Renders nothing on the server, so it's safe in Astro and other SSR setups.

**Props**: `open`, `onClose`, `title`, `description?`, `children?`, `footer?`, `variant?`, `closeOnScrim?`, `closeLabel?`, `className?`.

**You provide**: the open state, the footer buttons and what happens on close.

Source: `@q-labs/cobalt` 0.3.0 (`organisms/Modal`).
