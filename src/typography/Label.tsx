import React from 'react'

export type LabelVariant = 'lg' | 'md' | 'sm'

export interface LabelProps extends React.HTMLAttributes<HTMLElement> {
  variant?: LabelVariant
  as?: React.ElementType
}

export default function Label({ variant = 'md', as: Tag = 'span', className = '', children, ...props }: LabelProps) {
  return (
    <Tag className={`label-${variant}${className ? ` ${className}` : ''}`} {...props}>
      {children}
    </Tag>
  )
}
