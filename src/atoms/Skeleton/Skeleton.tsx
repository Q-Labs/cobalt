import React from 'react'
import cx from '../../utils/cx'
import styles from './Skeleton.module.css'

export type SkeletonVariant = 'text' | 'block' | 'circle'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant
  /** Number → px. String → any CSS length. Omit to fill the container. */
  width?: number | string
  /** Number → px. String → any CSS length. Omit to use the variant's default. */
  height?: number | string
  /** Text variant only: number of bars. The last bar is shorter, like the end of a paragraph. */
  lines?: number
}

const toLength = (v: number | string | undefined) => (typeof v === 'number' ? `${v}px` : v)

/** Decorative loading placeholder. Hidden from assistive tech: mark the loading region with `aria-busy` instead. */
export default function Skeleton({
  variant = 'text',
  width,
  height,
  lines = 1,
  className = '',
  style,
  ...props
}: SkeletonProps) {
  const shared = {
    'aria-hidden': true,
    style: { width: toLength(width), height: toLength(height), ...style },
    ...props,
  }
  const bar = (extra?: string | false) => cx(styles.skeleton, styles[`skeleton--${variant}`], extra)

  if (variant !== 'text' || lines <= 1) {
    return <div className={bar(className)} {...shared} />
  }

  return (
    <div className={cx(styles.lines, className)} {...shared}>
      {Array.from({ length: lines }, (_, i) => (
        <div key={i} className={bar(i === lines - 1 && styles['skeleton--last'])} />
      ))}
    </div>
  )
}
