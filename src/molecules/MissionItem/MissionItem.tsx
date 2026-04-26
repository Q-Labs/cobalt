import React from 'react'
import styles from './MissionItem.module.css'
import ProgressMini from '../../atoms/ProgressMini'

export type MissionStatus = 'active' | 'warning' | 'danger' | 'info'

export interface MissionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  progress: number
  status: MissionStatus
}

export default function MissionItem({ name, progress, status, className = '', ...props }: MissionItemProps) {
  return (
    <div className={[styles.mission, className].filter(Boolean).join(' ')} {...props}>
      <div className={[styles.status, styles[`status--${status}`]].join(' ')} />
      <span className={styles.name}>{name}</span>
      <div className={styles['progress-wrap']}>
        <ProgressMini value={progress} />
        <span className={styles.pct}>{progress}%</span>
      </div>
    </div>
  )
}
