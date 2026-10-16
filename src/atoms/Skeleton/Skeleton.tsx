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

export default function Skeleton({
  variant = 'text',
  width,
  height,
  lines = 1,
  className = '',
  style,
  ...props
}: SkeletonProps) {
  const size = { width: toLength(width), height: toLength(height), ...style }

  if (variant === 'text' && lines > 1) {
    return (
      <div className={cx(styles.lines, className)} aria-hidden="true" style={size} {...props}>
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className={cx(styles.skeleton, styles['skeleton--text'], i === lines - 1 && styles['skeleton--last'])}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className={cx(styles.skeleton, styles[`skeleton--${variant}`], className)}
      aria-hidden="true"
      style={size}
      {...props}
    />
  )
}
