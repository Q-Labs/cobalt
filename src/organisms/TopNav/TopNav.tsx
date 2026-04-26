import React from 'react'
import styles from './TopNav.module.css'

export interface TopNavProps extends React.HTMLAttributes<HTMLElement> {
  logo: React.ReactNode
  actions?: React.ReactNode
}

export default function TopNav({ logo, actions, className = '', children, ...props }: TopNavProps) {
  return (
    <nav className={[styles.nav, className].filter(Boolean).join(' ')} {...props}>
      <div className={styles.logo}>{logo}</div>
      {children && <div className={styles.links}>{children}</div>}
      {actions && <div className={styles.actions}>{actions}</div>}
    </nav>
  )
}
