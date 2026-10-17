# Textarea

A multi-line text field for notes and descriptions, styled to match `Input`.

**Use it for** free text longer than one line: notes for guests, descriptions, feedback.

**Rules**
- Always give it a visible label (a `<label htmlFor>`). Placeholder text is an example, not a label.
- On error, set `invalid` and show the message right under the field in `--text-danger`, linked with `aria-describedby`. `invalid` alone only changes the border (`--danger-default`) and sets `aria-invalid`.
- Defaults to 3 rows and resizes vertically. Set `rows` for a taller default.
- Focus ring is `--accent-glow` around a `--accent-default` border.

**Props**: everything a native `<textarea>` takes, plus `invalid?: boolean`.

**You provide**: the label, any helper or error text, and a character counter if the field has a limit.

Source: `@q-labs/cobalt` 0.3.0 (`atoms/Textarea`).
