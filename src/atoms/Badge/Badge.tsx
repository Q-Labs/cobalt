import React from 'react'
import styles from './Badge.module.css'

export type BadgeVariant = 'default' | 'active' | 'warning' | 'danger' | 'info' | 'shipped' | 'wip'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

export default function Badge({ variant = 'default', className = '', children, ...props }: BadgeProps) {
  const classes = [styles.badge, styles[`badge--${variant}`], className].filter(Boolean).join(' ')
  return (
    <span className={classes} {...props}>
      {children}
    </span>
  )
}
