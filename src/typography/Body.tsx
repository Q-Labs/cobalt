import React from 'react'

export type BodyVariant = 'lg' | 'md' | 'sm'

export interface BodyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: BodyVariant
  as?: React.ElementType
}

export default function Body({ variant = 'md', as: Tag = 'p', className = '', children, ...props }: BodyProps) {
  return (
    <Tag className={`body-${variant}${className ? ` ${className}` : ''}`} {...props}>
      {children}
    </Tag>
  )
}
