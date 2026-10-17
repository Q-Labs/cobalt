# Select

A styled native dropdown for picking one option from a short, fixed list.

**Use it for** 3–15 known choices (currency, sort order). Fewer than 4 and all visible matters: use `SegmentedControl`. Long or searchable lists need a combobox (not in the system yet).

**Rules**
- It is a real `<select>`, so keyboard, screen readers and the phone's native picker all work without extra code.
- Pass `options` (`{ value, label, disabled? }[]`) or plain `<option>` children.
- `placeholder` adds a first option that can't be picked again. It shows on load unless `value` or `defaultValue` is set.
- `invalid` sets the `--danger-default` border and `aria-invalid`; pair it with a visible message.
- Always pair it with a visible `<label>`.

**Props**: everything a native `<select>` takes, plus `options?`, `placeholder?`, `invalid?`. `className` goes on the wrapper; other props go on the `<select>`.

**You provide**: the label and any error text.

Source: `@q-labs/cobalt` 0.3.0 (`atoms/Select`).
