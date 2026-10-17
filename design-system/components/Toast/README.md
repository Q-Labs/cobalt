# Toast

A short, temporary notice confirming an action or reporting a problem, with an optional action and close button.

**Use it for** feedback on something the person just did ("Added to Holiday 2026", "Share link copied"). Don't use it for anything they must act on to continue: that's a `Modal` or inline error.

**Rules**
- Variants and their icon tone: `success` (`--status-active`), `warning` (`--status-warning`), `error` (`--status-danger`), `info` (`--status-info`). The icon and title carry the meaning, never color alone.
- Title is a short past-tense statement or plain problem; the description adds one detail.
- At most one action, named with a verb ("Undo", "Retry").
- `error` uses `role="alert"` and interrupts; the others use `role="status"` and wait their turn.
- This is the visual only: there's no toast queue. Render toasts inside one container that is always on the page, so screen readers reliably announce new ones. Auto-dismiss after 5–8 seconds, but never auto-dismiss an error with an action.

**Props**: `variant?`, `title`, `description?`, `action?: ReactNode`, `onDismiss?` (shows the close button), `dismissLabel?`, plus standard div attributes.

**You provide**: the container, positioning, timing and the action button.

Source: `@q-labs/cobalt` 0.3.0 (`molecules/Toast`).
