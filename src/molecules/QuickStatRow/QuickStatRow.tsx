import React from 'react'
import styles from './QuickStatRow.module.css'

export interface QuickStatRowProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  value: string
}

export default function QuickStatRow({ label, value, className = '', ...props }: QuickStatRowProps) {
  return (
    <div className={[styles.row, className].filter(Boolean).join(' ')} {...props}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </div>
  )
}
