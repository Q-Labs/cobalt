import React from 'react'
import styles from './MetricCard.module.css'

export type DeltaDirection = 'up' | 'down' | 'flat'

export interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  label: string
  delta?: string
  deltaDirection?: DeltaDirection
}

export default function MetricCard({ value, label, delta, deltaDirection = 'flat', className = '', ...props }: MetricCardProps) {
  return (
    <div className={[styles.metric, className].filter(Boolean).join(' ')} {...props}>
      <span className={styles.value}>{value}</span>
      <span className={styles.label}>{label}</span>
      {delta && (
        <span className={[styles.delta, styles[`delta--${deltaDirection}`]].join(' ')}>
          {delta}
        </span>
      )}
    </div>
  )
}
