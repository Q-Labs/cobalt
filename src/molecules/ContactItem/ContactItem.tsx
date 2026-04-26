import React from 'react'
import styles from './ContactItem.module.css'

export interface ContactItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  value: string
  href?: string
}

export default function ContactItem({ label, value, href, className = '', ...props }: ContactItemProps) {
  return (
    <div className={[styles.contact, className].filter(Boolean).join(' ')} {...props}>
      <div className={styles.icon}>{label}</div>
      {href ? (
        <a href={href} className={styles.value}>{value}</a>
      ) : (
        <span className={styles.value}>{value}</span>
      )}
    </div>
  )
}
