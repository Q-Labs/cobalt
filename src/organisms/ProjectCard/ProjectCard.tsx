import React from 'react'
import styles from './ProjectCard.module.css'
import Badge from '../../atoms/Badge'
import Tag from '../../atoms/Tag'
import ProgressMini from '../../atoms/ProgressMini'
import type { BadgeVariant } from '../../atoms/Badge'

export interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  badge?: BadgeVariant | string
  tags?: string[]
  href?: string
  linkLabel?: string
  progress?: number
  icon?: React.ReactNode
}

export default function ProjectCard({ title, description, badge, tags, href, linkLabel, progress, icon, className = '', ...props }: ProjectCardProps) {
  return (
    <div className={[styles.card, className].filter(Boolean).join(' ')} {...props}>
      <div className={styles.top}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <div style={{ flex: 1 }}>
          <div className={styles.title}>{title}</div>
        </div>
        {badge && <Badge variant={badge as BadgeVariant}>{badge}</Badge>}
      </div>
      <p className={styles.description}>{description}</p>
      {tags && tags.length > 0 && (
        <div className={styles.tags}>
          {tags.map((t) => <Tag key={t}>{t}</Tag>)}
        </div>
      )}
      {(href || progress !== undefined) && (
        <div className={styles.footer}>
          {href && <a href={href} className={styles.link}>{linkLabel ?? href}</a>}
          {progress !== undefined && <ProgressMini value={progress} />}
        </div>
      )}
    </div>
  )
}
