import React from 'react'
import styles from './Topbar.module.css'

export interface TopbarProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  meta?: string
  actions?: React.ReactNode
}

export default function Topbar({ title, meta, actions, className = '', ...props }: TopbarProps) {
  return (
    <div className={[styles.topbar, className].filter(Boolean).join(' ')} {...props}>
      <div className={styles.left}>
        <span className={styles.title}>{title}</span>
        {meta && <span className={styles.meta}>{meta}</span>}
      </div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  )
}
