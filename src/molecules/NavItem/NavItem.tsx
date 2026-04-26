import React from 'react'
import styles from './NavItem.module.css'
import NavBadge from '../../atoms/NavBadge'

export interface NavItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  icon?: React.ReactNode
  count?: number
  active?: boolean
}

export default function NavItem({ label, icon, count, active = false, className = '', ...props }: NavItemProps) {
  const classes = [
    styles['nav-item'],
    active ? styles['nav-item--active'] : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div className={classes} {...props}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.label}>{label}</span>
      {count !== undefined && <NavBadge count={count} />}
    </div>
  )
}
