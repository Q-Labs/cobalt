import React from 'react'

export type LogoMarkName = 'ring' | 'open' | 'cloud129' | 'quincy-os'

export interface LogoMarkProps extends React.SVGAttributes<SVGSVGElement> {
  name: LogoMarkName
  size?: number
}

const marks: Record<LogoMarkName, (size: number, rest: React.SVGAttributes<SVGSVGElement>) => React.ReactElement> = {
  ring: (size, rest) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <rect width="64" height="64" rx="14" fill="#2563EB" />
      <rect x="0.75" y="0.75" width="62.5" height="62.5" rx="13.25" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" fill="none" />
      <path d="M 38 43 A 16 16 0 1 1 44 37 L 52 43" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),
  open: (size, rest) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path d="M 38 43 A 16 16 0 1 1 44 37 L 52 43" stroke="#2563EB" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),
  cloud129: (size, rest) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <rect width="64" height="64" rx="14" fill="#2563EB" />
      <rect x="0.75" y="0.75" width="62.5" height="62.5" rx="13.25" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" fill="none" />
      <path d="M 40 14 A 13 13 0 1 0 40 37" stroke="white" strokeWidth="6.5" strokeLinecap="round" fill="none" />
      <line x1="12" y1="42" x2="52" y2="42" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <text x="32" y="56" fontFamily="'Courier New', Courier, monospace" fontSize="12" fontWeight="700" fill="white" textAnchor="middle" letterSpacing="1.5">129</text>
    </svg>
  ),
  'quincy-os': (size, rest) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <rect width="64" height="64" rx="14" fill="#2563EB" />
      <rect x="0.75" y="0.75" width="62.5" height="62.5" rx="13.25" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none" />
      <path d="M 41 43 A 17 17 0 1 1 47 37 L 54 44" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),
}

export default function LogoMark({ name, size = 32, className, ...rest }: LogoMarkProps) {
  return marks[name](size, { className, ...rest })
}
