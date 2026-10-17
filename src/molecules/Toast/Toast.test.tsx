import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Toast from './Toast'

describe('Toast', () => {
  it('renders its title as a status message by default', () => {
    render(<Toast title="Share link copied" />)
    const toast = screen.getByRole('status')
    expect(toast).toHaveTextContent('Share link copied')
    expect(toast).toHaveClass('toast', 'toast--info')
  })

  it.each([
    ['success', 'check', 'status'],
    ['warning', 'alertCircle', 'status'],
    ['info', 'info', 'status'],
    ['error', 'xCircle', 'alert'],
  ] as const)('renders the %s variant with its icon and role', (variant, icon, role) => {
    const { container } = render(<Toast variant={variant} title="Message" />)
    expect(screen.getByRole(role)).toHaveClass(`toast--${variant}`)
    expect(container.querySelector('svg')).toHaveAttribute('data-icon', icon)
  })

  it('renders a description when given', () => {
    render(<Toast title="Added to Holiday 2026" description="Ray-Ban Meta Wayfarer (Gen 2)" />)
    expect(screen.getByText('Ray-Ban Meta Wayfarer (Gen 2)')).toHaveClass('description')
  })

  it('renders no description when omitted', () => {
    const { container } = render(<Toast title="Saved" />)
    expect(container.querySelector('.description')).toBeNull()
  })

  it('renders an action', async () => {
    const undo = vi.fn()
    render(<Toast variant="success" title="Added" action={<button onClick={undo}>Undo</button>} />)
    await userEvent.click(screen.getByRole('button', { name: 'Undo' }))
    expect(undo).toHaveBeenCalledOnce()
  })

  it('shows a dismiss button only when onDismiss is given', async () => {
    const onDismiss = vi.fn()
    const { rerender } = render(<Toast title="Saved" />)
    expect(screen.queryByRole('button', { name: 'Dismiss' })).toBeNull()
    rerender(<Toast title="Saved" onDismiss={onDismiss} />)
    await userEvent.click(screen.getByRole('button', { name: 'Dismiss' }))
    expect(onDismiss).toHaveBeenCalledOnce()
  })

  it('accepts a custom dismiss label', () => {
    render(<Toast title="Saved" onDismiss={vi.fn()} dismissLabel="Close notification" />)
    expect(screen.getByRole('button', { name: 'Close notification' })).toBeInTheDocument()
  })

  it('forwards className and other attributes', () => {
    render(<Toast title="Saved" className="extra" data-testid="t" />)
    expect(screen.getByTestId('t')).toHaveClass('toast', 'extra')
  })
})
