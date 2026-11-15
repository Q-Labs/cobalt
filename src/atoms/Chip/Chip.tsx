import React from 'react'
import cx from '../../utils/cx'
import styles from './Chip.module.css'

export interface ChipProps extends React.ComponentPropsWithoutRef<'button'> {
  /** Whether the chip's filter is on. Sets `aria-pressed`. */
  selected?: boolean
  /** Optional count shown after the label, e.g. items matching the filter. */
  count?: number | string
}

export default function Chip({
  selected = false,
  count,
  type = 'button',
  className = '',
  children,
  ...props
}: ChipProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={cx(styles.chip, selected && styles['chip--selected'], className)}
      {...props}
    >
      {children}
      {count !== undefined && <span className={styles.count}>{count}</span>}
    </button>
  )
}
