import React from 'react'

export type MonoVariant = 'lg' | 'md' | 'sm' | 'xs'

export interface MonoProps extends React.HTMLAttributes<HTMLElement> {
  variant?: MonoVariant
  as?: React.ElementType
}

export default function Mono({ variant = 'md', as: Tag = 'code', className = '', children, ...props }: MonoProps) {
  const variantClass = variant === 'md' ? 'mono' : `mono-${variant}`
  return (
    <Tag className={`${variantClass}${className ? ` ${className}` : ''}`} {...props}>
      {children}
    </Tag>
  )
}
