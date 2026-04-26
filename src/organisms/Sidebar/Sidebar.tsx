import React from 'react'
import styles from './Sidebar.module.css'

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  logo: React.ReactNode
  footer?: React.ReactNode
}

export default function Sidebar({ logo, footer, className = '', children, ...props }: SidebarProps) {
  return (
    <aside className={[styles.sidebar, className].filter(Boolean).join(' ')} {...props}>
      <div className={styles['logo-wrap']}>{logo}</div>
      <nav className={styles.nav}>{children}</nav>
      {footer && <div className={styles['footer-wrap']}>{footer}</div>}
    </aside>
  )
}
