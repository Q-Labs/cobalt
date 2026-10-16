import React from 'react'
import styles from './Textarea.module.css'

export interface TextareaProps extends React.ComponentPropsWithoutRef<'textarea'> {
  invalid?: boolean
}

export default function Textarea({ invalid = false, rows = 3, className = '', ...props }: TextareaProps) {
  const classes = [styles.textarea, invalid && styles['textarea--invalid'], className].filter(Boolean).join(' ')
  return <textarea className={classes} rows={rows} aria-invalid={invalid || undefined} {...props} />
}
