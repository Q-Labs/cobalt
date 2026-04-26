import React from 'react'
import styles from './SignalItem.module.css'

export type SignalVariant = 'active' | 'warning' | 'danger' | 'info'

export interface SignalItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  body: string
  timestamp: string
  variant: SignalVariant
  icon?: React.ReactNode
}

export default function SignalItem({ title, body, timestamp, variant, icon, className = '', ...props }: SignalItemProps) {
  return (
    <div className={[styles.signal, styles[`signal--${variant}`], className].filter(Boolean).join(' ')} {...props}>
      <div className={styles['icon-wrap']}>{icon}</div>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.body}>{body}</div>
        <div className={styles.timestamp}>{timestamp}</div>
      </div>
    </div>
  )
}
