import React from 'react'
import styles from './PortfolioLayout.module.css'

export interface PortfolioLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  nav: React.ReactNode
}

export default function PortfolioLayout({ nav, className = '', children, ...props }: PortfolioLayoutProps) {
  return (
    <div className={[styles.layout, className].filter(Boolean).join(' ')} {...props}>
      {nav}
      <div className={styles.content}>{children}</div>
    </div>
  )
}
