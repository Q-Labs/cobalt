import React from 'react'
import styles from './StatusBar.module.css'

export interface StatusBarProps extends React.HTMLAttributes<HTMLDivElement> {
  badge: string
  meta?: string
}

export default function StatusBar({ badge, meta, className = '', ...props }: StatusBarProps) {
  return (
    <div className={[styles.bar, className].filter(Boolean).join(' ')} {...props}>
      <div className={styles['badge-wrap']}>
        <div className={styles.dot} />
        <span className={styles['badge-text']}>{badge}</span>
      </div>
      {meta && <span className={styles.meta}>{meta}</span>}
    </div>
  )
}
