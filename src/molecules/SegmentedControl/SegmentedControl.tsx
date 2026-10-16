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

export default function SegmentedControl({
  options,
  value,
  defaultValue,
  onChange,
  disabled = false,
  size = 'md',
  className = '',
  ...props
}: SegmentedControlProps) {
  const [inner, setInner] = useState(defaultValue)
  const current = value !== undefined ? value : inner
  const refs = useRef<Array<HTMLButtonElement | null>>([])

  const enabled = options.flatMap((o, i) => (disabled || o.disabled ? [] : [i]))
  const checkedIndex = options.findIndex((o) => o.value === current)
  const tabbable = checkedIndex >= 0 ? checkedIndex : enabled[0]

  const select = (index: number) => {
    const next = options[index].value
    if (next === current) return
    if (value === undefined) setInner(next)
    onChange?.(next)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (enabled.length === 0) return
    const from = enabled.indexOf(refs.current.indexOf(e.target as HTMLButtonElement))
    let to: number
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        to = enabled[(from + 1) % enabled.length]
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        to = enabled[(from - 1 + enabled.length) % enabled.length]
        break
      case 'Home':
        to = enabled[0]
        break
      case 'End':
        to = enabled[enabled.length - 1]
        break
      default:
        return
    }
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
