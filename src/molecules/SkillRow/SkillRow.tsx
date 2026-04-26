import React from 'react'
import styles from './SkillRow.module.css'
import ProgressBar from '../../atoms/ProgressBar'

export interface SkillRowProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  value: number
}

export default function SkillRow({ name, value, className = '', ...props }: SkillRowProps) {
  return (
    <div className={[styles.row, className].filter(Boolean).join(' ')} {...props}>
      <span className={styles.name}>{name}</span>
      <div className={styles.bar}>
        <ProgressBar value={value} color="accent" />
      </div>
    </div>
  )
}
