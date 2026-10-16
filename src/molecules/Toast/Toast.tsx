import React from 'react'
import cx from '../../utils/cx'
import StrokeIcon, { type StrokeIconName } from '../../utils/StrokeIcon'
import styles from './Toast.module.css'

export type ToastVariant = 'success' | 'warning' | 'error' | 'info'

export interface ToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: ToastVariant
  title: React.ReactNode
  description?: React.ReactNode
  /** A small control after the text, e.g. an Undo or Retry button. */
  action?: React.ReactNode
  /** Shows a close button when given. */
  onDismiss?: () => void
  dismissLabel?: string
}

const icons: Record<ToastVariant, StrokeIconName> = {
  success: 'check',
  warning: 'alertCircle',
  error: 'xCircle',
  info: 'info',
}

export default function Toast({
  variant = 'info',
  title,
  description,
  action,
  onDismiss,
  dismissLabel = 'Dismiss',
  className = '',
  ...props
}: ToastProps) {
  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className={cx(styles.toast, styles[`toast--${variant}`], className)}
      {...props}
    >
      <StrokeIcon name={icons[variant]} size={18} className={styles.icon} />
      <div className={styles.text}>
        <div className={styles.title}>{title}</div>
        {description && <div className={styles.description}>{description}</div>}
      </div>
      {action}
      {onDismiss && (
        <button type="button" className={styles.dismiss} aria-label={dismissLabel} onClick={onDismiss}>
          <StrokeIcon name="x" size={14} />
        </button>
      )}
    </div>
  )
}
