import React from 'react'
import styles from './ResumeLayout.module.css'

export interface ResumeLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  nav: React.ReactNode
  sidebar: React.ReactNode
  statusBar?: React.ReactNode
}

export default function ResumeLayout({ nav, sidebar, statusBar, className = '', children, ...props }: ResumeLayoutProps) {
  return (
    <div className={[styles.layout, className].filter(Boolean).join(' ')} {...props}>
      {nav}
      <div className={styles.body}>
        <div className={styles.sidebar}>{sidebar}</div>
        <main>{children}</main>
      </div>
      {statusBar}
    </div>
  )
}
