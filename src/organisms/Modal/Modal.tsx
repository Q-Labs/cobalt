import React, { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import cx from '../../utils/cx'
import StrokeIcon from '../../utils/StrokeIcon'
import styles from './Modal.module.css'

export type ModalVariant = 'dialog' | 'sheet' | 'responsive'

export interface ModalProps {
  open: boolean
  onClose: () => void
  title: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
  /** Buttons along the bottom, right-aligned. */
  footer?: React.ReactNode
  /** `responsive` is a dialog on wide screens and a bottom sheet under 640px. */
  variant?: ModalVariant
  closeOnScrim?: boolean
  closeLabel?: string
  className?: string
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  variant = 'dialog',
  closeOnScrim = true,
  closeLabel = 'Close',
  className = '',
}: ModalProps) {
  const titleId = useId()
  const descriptionId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusables = Array.from(panelRef.current!.querySelectorAll<HTMLElement>(FOCUSABLE))
    const first = focusables.find((el) => el !== closeRef.current) ?? closeRef.current!
    first.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current()
    }
    document.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      previous.focus()
    }
  }, [open])

  const trapTab = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab') return
    const focusables = Array.from(panelRef.current!.querySelectorAll<HTMLElement>(FOCUSABLE))
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  if (!open) return null

  return createPortal(
    <div className={styles.root}>
      <div className={styles.scrim} aria-hidden="true" onMouseDown={closeOnScrim ? onClose : undefined} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className={cx(styles.panel, styles[`panel--${variant}`], className)}
        onKeyDown={trapTab}
      >
        <div className={styles.grabber} aria-hidden="true" />
        <div className={styles.header}>
          <div className={styles.heading}>
            <h2 id={titleId} className={styles.title}>
              {title}
            </h2>
            {description && (
              <p id={descriptionId} className={styles.description}>
                {description}
              </p>
            )}
          </div>
          <button ref={closeRef} type="button" className={styles.close} aria-label={closeLabel} onClick={onClose}>
            <StrokeIcon name="x" size={18} />
          </button>
        </div>
        {children && <div className={styles.body}>{children}</div>}
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>,
    document.body,
  )
}
