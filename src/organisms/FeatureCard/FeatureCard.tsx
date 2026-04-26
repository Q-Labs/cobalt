import React from 'react'
import styles from './FeatureCard.module.css'

export interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  icon?: React.ReactNode
}

export default function FeatureCard({ title, description, icon, className = '', ...props }: FeatureCardProps) {
  return (
    <div className={[styles.card, className].filter(Boolean).join(' ')} {...props}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <div className={styles.title}>{title}</div>
      <div className={styles.desc}>{description}</div>
    </div>
  )
}
