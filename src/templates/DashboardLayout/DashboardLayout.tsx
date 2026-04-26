import React from 'react'
import styles from './DashboardLayout.module.css'

export interface DashboardLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  sidebar: React.ReactNode
  topbar: React.ReactNode
}

export default function DashboardLayout({ sidebar, topbar, className = '', children, ...props }: DashboardLayoutProps) {
  return (
    <div className={[styles.layout, className].filter(Boolean).join(' ')} {...props}>
      {sidebar}
      <div className={styles.main}>
        {topbar}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  )
}
