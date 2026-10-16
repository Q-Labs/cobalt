import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { renderToString } from 'react-dom/server'
import { describe, it, expect, vi, afterEach } from 'vitest'
import Modal from './Modal'

afterEach(() => {
  document.body.style.overflow = ''
})

describe('Modal', () => {
  it('renders nothing when closed', () => {
    render(<Modal open={false} onClose={vi.fn()} title="Add to Holiday 2026" />)
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('renders a modal dialog labelled by its title, in a portal on document.body', () => {
    const { container } = render(<Modal open onClose={vi.fn()} title="Add to Holiday 2026" />)
    const dialog = screen.getByRole('dialog', { name: 'Add to Holiday 2026' })
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(container).not.toContainElement(dialog)
    expect(document.body).toContainElement(dialog)
  })

  it('is described by its description when given', () => {
    render(<Modal open onClose={vi.fn()} title="Delete this item?" description="This can't be undone." />)
    expect(screen.getByRole('dialog')).toHaveAccessibleDescription("This can't be undone.")
  })

  it('has no description when omitted', () => {
    render(<Modal open onClose={vi.fn()} title="Delete this item?" />)
    expect(screen.getByRole('dialog')).not.toHaveAttribute('aria-describedby')
  })

  it('renders body content and a footer', () => {
    render(
      <Modal open onClose={vi.fn()} title="Add item" footer={<button>Save item</button>}>
        <p>Body copy</p>
      </Modal>,
    )
    expect(screen.getByText('Body copy')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Save item' }).parentElement).toHaveClass('footer')
  })

  it('renders no footer when omitted', () => {
    render(<Modal open onClose={vi.fn()} title="Add item" />)
    expect(document.querySelector('.footer')).toBeNull()
  })

  it.each(['dialog', 'sheet', 'responsive'] as const)('applies the %s variant', (variant) => {
    render(<Modal open onClose={vi.fn()} title="T" variant={variant} />)
    expect(screen.getByRole('dialog')).toHaveClass('panel', `panel--${variant}`)
  })

  it('defaults to the dialog variant and forwards className', () => {
    render(<Modal open onClose={vi.fn()} title="T" className="extra" />)
    expect(screen.getByRole('dialog')).toHaveClass('panel--dialog', 'extra')
  })

  it('closes from the close button', async () => {
    const onClose = vi.fn()
    render(<Modal open onClose={onClose} title="T" />)
    await userEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('accepts a custom close label', () => {
    render(<Modal open onClose={vi.fn()} title="T" closeLabel="Close dialog" />)
    expect(screen.getByRole('button', { name: 'Close dialog' })).toBeInTheDocument()
  })

  it('closes on Escape but not on other keys', async () => {
    const onClose = vi.fn()
    render(<Modal open onClose={onClose} title="T" />)
    await userEvent.keyboard('a')
    expect(onClose).not.toHaveBeenCalled()
    await userEvent.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('closes when the scrim is clicked', () => {
    const onClose = vi.fn()
    render(<Modal open onClose={onClose} title="T" />)
    fireEvent.mouseDown(document.querySelector('.scrim')!)
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('stays open on scrim click when closeOnScrim is false', () => {
    const onClose = vi.fn()
    render(<Modal open onClose={onClose} title="T" closeOnScrim={false} />)
    fireEvent.mouseDown(document.querySelector('.scrim')!)
    expect(onClose).not.toHaveBeenCalled()
  })

  it('moves focus to the first control in the content', () => {
    render(
      <Modal open onClose={vi.fn()} title="Add item" footer={<button>Save item</button>}>
        <input aria-label="Title" />
      </Modal>,
    )
    expect(screen.getByRole('textbox', { name: 'Title' })).toHaveFocus()
  })

  it('falls back to the close button when the content has no controls', () => {
    render(<Modal open onClose={vi.fn()} title="T"><p>Just text</p></Modal>)
    expect(screen.getByRole('button', { name: 'Close' })).toHaveFocus()
  })

  it('keeps Tab inside the dialog', async () => {
    render(
      <Modal open onClose={vi.fn()} title="T" footer={<><button>Cancel</button><button>Save</button></>}>
        <input aria-label="Title" />
      </Modal>,
    )
    const close = screen.getByRole('button', { name: 'Close' })
    const save = screen.getByRole('button', { name: 'Save' })
    const input = screen.getByRole('textbox')

    save.focus()
    await userEvent.tab()
    expect(close).toHaveFocus()

    await userEvent.tab({ shift: true })
    expect(save).toHaveFocus()

    input.focus()
    await userEvent.tab()
    expect(screen.getByRole('button', { name: 'Cancel' })).toHaveFocus()
  })

  it('ignores non-Tab keys inside the panel', () => {
    render(<Modal open onClose={vi.fn()} title="T"><input aria-label="Title" /></Modal>)
    const input = screen.getByRole('textbox')
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Enter' })
    expect(input).toHaveFocus()
  })

  it('locks page scroll while open and restores it on close', () => {
    document.body.style.overflow = 'auto'
    const { rerender } = render(<Modal open onClose={vi.fn()} title="T" />)
    expect(document.body.style.overflow).toBe('hidden')
    rerender(<Modal open={false} onClose={vi.fn()} title="T" />)
    expect(document.body.style.overflow).toBe('auto')
  })

  it('returns focus to the element that opened it', async () => {
    function Harness() {
      const [open, setOpen] = useState(false)
      return (
        <>
          <button onClick={() => setOpen(true)}>Add item</button>
          <Modal open={open} onClose={() => setOpen(false)} title="Add item" />
        </>
      )
    }
    render(<Harness />)
    const opener = screen.getByRole('button', { name: 'Add item' })
    await userEvent.click(opener)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    await userEvent.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(opener).toHaveFocus()
  })

  it('renders nothing on the server, even when open', () => {
    expect(renderToString(<Modal open onClose={vi.fn()} title="Add item" />)).toBe('')
  })

  it('closes only the topmost modal on Escape', async () => {
    const closeBottom = vi.fn()
    const closeTop = vi.fn()
    const { rerender } = render(
      <>
        <Modal open onClose={closeBottom} title="Edit item" />
        <Modal open onClose={closeTop} title="Delete this item?" />
      </>,
    )
    await userEvent.keyboard('{Escape}')
    expect(closeTop).toHaveBeenCalledOnce()
    expect(closeBottom).not.toHaveBeenCalled()

    rerender(
      <>
        <Modal open onClose={closeBottom} title="Edit item" />
        <Modal open={false} onClose={closeTop} title="Delete this item?" />
      </>,
    )
    await userEvent.keyboard('{Escape}')
    expect(closeBottom).toHaveBeenCalledOnce()
  })

  it('uses the latest onClose without re-running its setup', async () => {
    const first = vi.fn()
    const second = vi.fn()
    const { rerender } = render(<Modal open onClose={first} title="T"><input aria-label="Title" /></Modal>)
    const input = screen.getByRole('textbox')
    rerender(<Modal open onClose={second} title="T"><input aria-label="Title" /></Modal>)
    expect(input).toHaveFocus()
    await userEvent.keyboard('{Escape}')
    expect(first).not.toHaveBeenCalled()
    expect(second).toHaveBeenCalledOnce()
  })
})
