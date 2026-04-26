import React from 'react'
import styles from './ExperienceRole.module.css'
import Tag from '../../atoms/Tag'

export interface ExperienceRoleProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  period: string
  current?: boolean
  bullets?: string[]
  tags?: string[]
}

export default function ExperienceRole({ title, period, current = false, bullets, tags, className = '', ...props }: ExperienceRoleProps) {
  return (
    <div className={[styles.role, current ? styles['role--current'] : '', className].filter(Boolean).join(' ')} {...props}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        <span className={styles.period}>{period}</span>
      </div>
      {bullets && bullets.length > 0 && (
        <ul className={styles.bullets}>
          {bullets.map((b, i) => (
            <li key={i} className={styles.bullet}>{b}</li>
          ))}
        </ul>
      )}
      {tags && tags.length > 0 && (
        <div className={styles.tags}>
          {tags.map((t) => <Tag key={t}>{t}</Tag>)}
        </div>
      )}
    </div>
  )
}
