import React from 'react'
import styles from './ProgressMini.module.css'

export interface ProgressMiniProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
}

export default function ProgressMini({ value, className = '', ...props }: ProgressMiniProps) {
  const clamped = Math.min(100, Math.max(0, value))
  return (
    <div
      className={[styles.progress, className].filter(Boolean).join(' ')}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      {...props}
    >
      <div className={styles.fill} style={{ width: `${clamped}%` }} />
    </div>
  )
}
