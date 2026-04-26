import React from 'react'
import styles from './UserBlock.module.css'
import Avatar from '../../atoms/Avatar'

export interface UserBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  status: string
  avatarSrc?: string
}

export default function UserBlock({ name, status, avatarSrc, className = '', ...props }: UserBlockProps) {
  return (
    <div className={[styles['user-block'], className].filter(Boolean).join(' ')} {...props}>
      <Avatar name={name} src={avatarSrc} size="sm" />
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.status}>
          <div className={styles.dot} />
          {status}
        </div>
      </div>
    </div>
  )
}
