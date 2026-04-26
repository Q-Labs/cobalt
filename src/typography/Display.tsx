import React from 'react'

export type DisplayVariant = '2xl' | 'xl' | 'lg' | 'md' | 'sm'

export interface DisplayProps extends React.HTMLAttributes<HTMLHeadingElement> {
  variant: DisplayVariant
  as?: React.ElementType
}

export default function Display({ variant, as: Tag = 'h1', className = '', children, ...props }: DisplayProps) {
  return (
    <Tag className={`display-${variant}${className ? ` ${className}` : ''}`} {...props}>
      {children}
    </Tag>
  )
}
