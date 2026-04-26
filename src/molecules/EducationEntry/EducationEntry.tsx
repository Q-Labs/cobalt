import React from 'react'
import styles from './EducationEntry.module.css'

export interface EducationEntryProps extends React.HTMLAttributes<HTMLDivElement> {
  school: string
  degree: string
  period: string
}

export default function EducationEntry({ school, degree, period, className = '', ...props }: EducationEntryProps) {
  return (
    <div className={[styles.entry, className].filter(Boolean).join(' ')} {...props}>
      <div className={styles.left}>
        <div className={styles.school}>{school}</div>
        <div className={styles.degree}>{degree}</div>
      </div>
      <div className={styles.period}>{period}</div>
    </div>
  )
}
