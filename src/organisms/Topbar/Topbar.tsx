import React from 'react'
import styles from './Topbar.module.css'

export type TopbarTitleElement = 'span' | 'h1' | 'h2' | 'h3'

export interface TopbarProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  meta?: string
  actions?: React.ReactNode
  titleAs?: TopbarTitleElement
}

export default function Topbar({ title, meta, actions, titleAs: Title = 'span', className = '', ...props }: TopbarProps) {
  return (
    <div className={[styles.topbar, className].filter(Boolean).join(' ')} {...props}>
      <div className={styles.left}>
        <Title className={styles.title}>{title}</Title>
        {meta && <span className={styles.meta}>{meta}</span>}
      </div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  )
}
