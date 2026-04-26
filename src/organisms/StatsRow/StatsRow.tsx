import React from 'react'
import styles from './StatsRow.module.css'

export interface StatsRowProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function StatsRow({ className = '', children, ...props }: StatsRowProps) {
  return (
    <div className={[styles.row, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  )
}
