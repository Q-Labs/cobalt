import React, { useEffect, useId, useRef, useState } from 'react'
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

const focusablesIn = (el: HTMLElement) => Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE))

/** Open modals, oldest first. Only the last one answers Escape, so a nested dialog closes alone. */
const openStack: symbol[] = []

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
  const anchorRef = useRef<HTMLSpanElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  // The portal sits on <body>, outside any CobaltProvider, so it re-applies the nearest
  // ancestor's theme, found from a hidden anchor left in place.
  const [theme, setTheme] = useState<string>()
  const readTheme = () => anchorRef.current!.closest('[data-theme]')?.getAttribute('data-theme') ?? undefined

  // The portal needs `document`, which doesn't exist during server rendering. Waiting for
  // the first client effect keeps SSR and hydration output identical either way. The theme
  // is read in the same pass, so the first open paints in the right theme.
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
    setTheme(readTheme())
  }, [])

  // Re-read on each open in case the theme was switched while the modal was closed.
  useEffect(() => {
    if (open) setTheme(readTheme())
  }, [open])

  useEffect(() => {
    if (!open || !mounted) return
    const id = Symbol('modal')
    openStack.push(id)
    const previous = document.activeElement as HTMLElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Take the rest of the page out of reach (Tab, clicks, screen-reader browsing) while open.
    const madeInert = Array.from(document.body.children).filter(
      (el) => el !== rootRef.current && !el.hasAttribute('inert'),
    )
    madeInert.forEach((el) => el.setAttribute('inert', ''))

    // Start on the first control in the content; the close button is the fallback.
    const initial = focusablesIn(panelRef.current!).find((el) => el !== closeRef.current) ?? closeRef.current!
    initial.focus()

    const onKey = (e: KeyboardEvent) => {
      // Skip an Escape that content inside already handled (a combobox closing its own list).
      if (e.key === 'Escape' && !e.defaultPrevented && openStack[openStack.length - 1] === id) onCloseRef.current()
    }
    document.addEventListener('keydown', onKey)

    return () => {
      openStack.splice(openStack.indexOf(id), 1)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      madeInert.forEach((el) => el.removeAttribute('inert'))
      previous.focus() // after removing inert: an inert element can't take focus
    }
  }, [open, mounted])

  const trapTab = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab') return
    const focusables = focusablesIn(panelRef.current!)
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

  // An empty, hidden anchor stays in place so the modal can find its themed ancestor.
  const anchor = <span ref={anchorRef} hidden />
  if (!open || !mounted) return anchor

  return (
    <>
      {anchor}
      {createPortal(
        <div ref={rootRef} className={styles.root} data-theme={theme}>
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
      )}
    </>
  )
}
