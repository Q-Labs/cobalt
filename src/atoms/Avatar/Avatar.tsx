import React from 'react'
import styles from './Avatar.module.css'

export type AvatarSize = 'sm' | 'md' | 'lg'

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  src?: string
  size?: AvatarSize
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export default function Avatar({ name, src, size = 'md', className = '', ...props }: AvatarProps) {
  const classes = [styles.avatar, styles[`avatar--${size}`], className].filter(Boolean).join(' ')
  return (
    <div className={classes} {...props}>
      {src ? (
        <img src={src} alt={name} />
      ) : (
        getInitials(name)
      )}
    </div>
  )
}
