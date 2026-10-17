# SegmentedControl

A row of 2–5 mutually exclusive options, all visible at once, for picking exactly one.

**Use it for** a single choice with few options where seeing all of them helps (priority: High / Medium / Low). More than 5 options: use `Select`.

**Rules**
- It is a `radiogroup`: Tab enters on the checked option, arrow keys move and select (wrapping at the ends), Home and End jump. Disabled options are skipped.
- Always give it an accessible name: `aria-label`, or `aria-labelledby` pointing at a visible label.
- Controlled (`value` + `onChange`) or uncontrolled (`defaultValue`). `onChange` gets the option's `value` string.
- Your own `onKeyDown` runs first; call `preventDefault()` in it to stop the built-in arrow-key behavior.
- Checked option: `--bg-overlay` with `--shadow-sm` on a `--bg-raised` track.

**Props**: `options` (`{ value, label, disabled? }[]`), `value?`, `defaultValue?`, `onChange?`, `disabled?`, `size?: 'sm' | 'md'`, plus standard div attributes.

**You provide**: the label, and the state if controlled. It does not post its value in a plain HTML form; read it from `onChange`.

Source: `@q-labs/cobalt` 0.3.0 (`molecules/SegmentedControl`).
