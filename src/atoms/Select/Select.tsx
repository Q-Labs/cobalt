import React from 'react'
import cx from '../../utils/cx'
import StrokeIcon from '../../utils/StrokeIcon'
import styles from './Select.module.css'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends React.ComponentPropsWithoutRef<'select'> {
  /** Options to render. Omit to pass `<option>` children instead. */
  options?: SelectOption[]
  /** A first, unpickable option shown while nothing is chosen. Pair with `defaultValue=""` or `value=""`. */
  placeholder?: string
  /** Shows the danger border and sets `aria-invalid`. */
  invalid?: boolean
}

export default function Select({
  options,
  placeholder,
  invalid = false,
  className = '',
  children,
  ...props
}: SelectProps) {
  return (
    <span className={cx(styles.wrapper, className)}>
      <select
        className={cx(styles.select, invalid && styles['select--invalid'])}
        aria-invalid={invalid || undefined}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options
          ? options.map((o) => (
              <option key={o.value} value={o.value} disabled={o.disabled}>
                {o.label}
              </option>
            ))
          : children}
      </select>
      <StrokeIcon name="chevronDown" size={14} className={styles.chevron} />
    </span>
  )
}
