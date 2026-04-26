import React from 'react'
import styles from './LandingLayout.module.css'

export interface LandingLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  nav: React.ReactNode
}

export default function LandingLayout({ nav, className = '', children, ...props }: LandingLayoutProps) {
  return (
    <div className={[styles.layout, className].filter(Boolean).join(' ')} {...props}>
      {nav}
      <div className={styles.sections}>{children}</div>
    </div>
  )
}
