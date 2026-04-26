import React from 'react'
import styles from './ProgressBar.module.css'

export type ProgressColor = 'accent' | 'active' | 'warning' | 'danger'

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  color?: ProgressColor
}

export default function ProgressBar({ value, color = 'accent', className = '', ...props }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))
  const classes = [styles.progress, styles[`progress--${color}`], className].filter(Boolean).join(' ')
  return (
    <div
      className={classes}
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
