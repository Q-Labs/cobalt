import React, { useRef, useState } from 'react'
import cx from '../../utils/cx'
import styles from './SegmentedControl.module.css'

export interface SegmentedOption {
  value: string
  label: string
  disabled?: boolean
}

export type SegmentedControlSize = 'sm' | 'md'

export interface SegmentedControlProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  options: SegmentedOption[]
  /** Controlled value. */
  value?: string
  /** Initial value when uncontrolled. */
  defaultValue?: string
  onChange?: (value: string) => void
  disabled?: boolean
  size?: SegmentedControlSize
}

/**
 * Where a key press moves focus, as an index into `options`. `enabled` lists the
 * indexes that can take focus; `from` is the position within `enabled` that has it.
 * Returns undefined for keys the radio pattern doesn't handle.
 */
function targetIndex(key: string, from: number, enabled: number[]): number | undefined {
  if (enabled.length === 0) return undefined
  const last = enabled.length - 1
  switch (key) {
    case 'ArrowRight':
    case 'ArrowDown':
      return enabled[from === last ? 0 : from + 1]
    case 'ArrowLeft':
    case 'ArrowUp':
      return enabled[from <= 0 ? last : from - 1]
    case 'Home':
      return enabled[0]
    case 'End':
      return enabled[last]
    default:
      return undefined
  }
}

export default function SegmentedControl({
  options,
  value,
  defaultValue,
  onChange,
  disabled = false,
  size = 'md',
  className = '',
  onKeyDown,
  ...props
}: SegmentedControlProps) {
  const [inner, setInner] = useState(defaultValue)
  const current = value !== undefined ? value : inner
  const refs = useRef<Array<HTMLButtonElement | null>>([])

  const enabled = options.flatMap((o, i) => (disabled || o.disabled ? [] : [i]))
  const checkedIndex = options.findIndex((o) => o.value === current)
  // A disabled option can't take focus, so it can't be the tab stop even when checked.
  const tabbable = enabled.includes(checkedIndex) ? checkedIndex : enabled[0]

  const select = (index: number) => {
    const next = options[index].value
    if (next === current) return
    if (value === undefined) setInner(next)
    onChange?.(next)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e)
    if (e.defaultPrevented) return
    const from = enabled.indexOf(refs.current.indexOf(e.target as HTMLButtonElement))
    const to = targetIndex(e.key, from, enabled)
    if (to === undefined) return
    e.preventDefault()
    refs.current[to]!.focus()
    select(to)
  }

  return (
    <div
      {...props}
      role="radiogroup"
      aria-disabled={disabled || undefined}
      className={cx(styles.segmented, styles[`segmented--${size}`], className)}
      onKeyDown={handleKeyDown}
    >
      {options.map((o, i) => (
        <button
          key={o.value}
          ref={(el) => {
            refs.current[i] = el
          }}
          type="button"
          role="radio"
          aria-checked={i === checkedIndex}
          tabIndex={i === tabbable ? 0 : -1}
          disabled={disabled || o.disabled}
          className={cx(styles.option, i === checkedIndex && styles['option--checked'])}
          onClick={() => select(i)}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
