import React from 'react'
import styles from './NavBadge.module.css'

export interface NavBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  count: number
}

export default function NavBadge({ count, className = '', ...props }: NavBadgeProps) {
  return (
    <span className={[styles['nav-badge'], className].filter(Boolean).join(' ')} {...props}>
      {count > 99 ? '99+' : count}
    </span>
  )
}
