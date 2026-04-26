import React from 'react'
import styles from './StatusDot.module.css'

export type StatusVariant = 'active' | 'warning' | 'danger' | 'info' | 'offline'

export interface StatusDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: StatusVariant
  animated?: boolean
}

export default function StatusDot({ variant = 'active', animated = false, className = '', ...props }: StatusDotProps) {
  const classes = [
    styles['status-dot'],
    styles[`status-dot--${variant}`],
    animated ? styles['status-dot--animated'] : '',
    className,
  ].filter(Boolean).join(' ')

  return <span className={classes} role="img" {...props} />
}
