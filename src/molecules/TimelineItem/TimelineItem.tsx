import React from 'react'
import styles from './TimelineItem.module.css'

export interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  date: string
  active?: boolean
  isLast?: boolean
}

export default function TimelineItem({ title, date, active = false, isLast = false, className = '', ...props }: TimelineItemProps) {
  return (
    <div
      className={[styles['timeline-item'], active ? styles['timeline-item--active'] : '', className].filter(Boolean).join(' ')}
      {...props}
    >
      <div className={styles.left}>
        <div className={styles.dot} />
        {!isLast && <div className={styles.line} />}
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.date}>{date}</div>
      </div>
    </div>
  )
}
