import React from 'react'
import styles from './Hero.module.css'

export interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  headline: string
  eyebrow?: string
  sub?: string
  actions?: React.ReactNode
  meta?: React.ReactNode
}

export default function Hero({ headline, eyebrow, sub, actions, meta, className = '', ...props }: HeroProps) {
  return (
    <div className={[styles.hero, className].filter(Boolean).join(' ')} {...props}>
      {eyebrow && <div className={styles.eyebrow}>{eyebrow}</div>}
      <h1 className={styles.headline}>{headline}</h1>
      {sub && <p className={styles.sub}>{sub}</p>}
      {actions && <div className={styles.actions}>{actions}</div>}
      {meta && <div className={styles.meta}>{meta}</div>}
    </div>
  )
}
