import React from 'react'
import styles from './Divider.module.css'

export type DividerOrientation = 'horizontal' | 'vertical'

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: DividerOrientation
}

export default function Divider({ orientation = 'horizontal', className = '', ...props }: DividerProps) {
  return (
    <hr
      className={[styles[`divider--${orientation}`], className].filter(Boolean).join(' ')}
      aria-orientation={orientation}
      {...props}
    />
  )
}
