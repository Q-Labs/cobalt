import React from 'react'
import styles from './Card.module.css'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  meta?: string
}

export default function Card({ title, meta, className = '', children, ...props }: CardProps) {
  return (
    <div className={[styles.card, className].filter(Boolean).join(' ')} {...props}>
      {title && (
        <div className={styles.header}>
          <span className={styles.title}>{title}</span>
          {meta && <span className={styles.meta}>{meta}</span>}
        </div>
      )}
      <div className={styles.body}>{children}</div>
    </div>
  )
}
