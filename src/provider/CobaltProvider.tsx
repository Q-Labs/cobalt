import React from 'react'
import '../tokens/index.css'

export type CobaltTheme = 'dark' | 'light'

export interface CobaltProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: CobaltTheme
}

export default function CobaltProvider({ theme = 'dark', className = '', children, ...props }: CobaltProviderProps) {
  return (
    <div data-theme={theme} className={className || undefined} {...props}>
      {children}
    </div>
  )
}
