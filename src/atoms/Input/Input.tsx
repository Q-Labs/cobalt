import React from 'react'
import styles from './Input.module.css'

export interface InputProps extends React.ComponentPropsWithoutRef<'input'> {}

export default function Input({ className = '', ...props }: InputProps) {
  return (
    <input className={[styles.input, className].filter(Boolean).join(' ')} {...props} />
  )
}
