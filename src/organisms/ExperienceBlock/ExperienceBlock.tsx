import React from 'react'
import styles from './ExperienceBlock.module.css'

export interface ExperienceBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  org: string
  tenure: string
  orgLogo?: React.ReactNode
}

export default function ExperienceBlock({ org, tenure, orgLogo, className = '', children, ...props }: ExperienceBlockProps) {
  const initials = org.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
  return (
    <div className={[styles.block, className].filter(Boolean).join(' ')} {...props}>
      <div className={styles.header}>
        <div className={styles.logo}>{orgLogo ?? initials}</div>
        <div className={styles['org-info']}>
          <div className={styles['org-name']}>{org}</div>
          <div className={styles.tenure}>{tenure}</div>
        </div>
      </div>
      {children && <div className={styles.roles}>{children}</div>}
    </div>
  )
}
