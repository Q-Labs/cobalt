import React from 'react'
import styles from './Tag.module.css'

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {}

export default function Tag({ className = '', children, ...props }: TagProps) {
  return (
    <span className={[styles.tag, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </span>
  )
}
