import React from 'react'
import styles from './StatItem.module.css'

export interface StatItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  label: string
}

export default function StatItem({ value, label, className = '', ...props }: StatItemProps) {
  return (
    <div className={[styles.stat, className].filter(Boolean).join(' ')} {...props}>
      <span className={styles.value}>{value}</span>
      <span className={styles.label}>{label}</span>
    </div>
  )
}
