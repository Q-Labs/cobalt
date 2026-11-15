import React from 'react'
import cx from '../../utils/cx'
import styles from './Textarea.module.css'

export interface TextareaProps extends React.ComponentPropsWithoutRef<'textarea'> {
  /** Shows the danger border and sets `aria-invalid`. Pair with a visible error message. */
  invalid?: boolean
}

export default function Textarea({ invalid = false, rows = 3, className = '', ...props }: TextareaProps) {
  return (
    <textarea
      className={cx(styles.textarea, invalid && styles['textarea--invalid'], className)}
      rows={rows}
      aria-invalid={invalid || undefined}
      {...props}
    />
  )
}
