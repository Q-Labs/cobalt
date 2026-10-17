import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Chip from './Chip'

describe('Chip', () => {
  it('renders a button with its label', () => {
    render(<Chip>High</Chip>)
    expect(screen.getByRole('button', { name: 'High' })).toBeInTheDocument()
  })

  it('defaults to type="button" so it never submits a form', () => {
    render(<Chip>High</Chip>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })

  it('is not pressed by default', () => {
    render(<Chip>High</Chip>)
    const chip = screen.getByRole('button')
    expect(chip).toHaveAttribute('aria-pressed', 'false')
    expect(chip).not.toHaveClass('chip--selected')
  })

  it('reflects the selected state', () => {
    render(<Chip selected>All</Chip>)
    const chip = screen.getByRole('button')
    expect(chip).toHaveAttribute('aria-pressed', 'true')
    expect(chip).toHaveClass('chip--selected')
  })

  it('renders a count when given', () => {
    render(<Chip count={8}>All</Chip>)
    expect(screen.getByText('8')).toHaveClass('count')
    expect(screen.getByRole('button')).toHaveAccessibleName('All 8')
  })

  it('renders a count of zero', () => {
    render(<Chip count={0}>Low</Chip>)
    expect(screen.getByText('0')).toHaveClass('count')
  })

  it('renders no count when omitted', () => {
    const { container } = render(<Chip>High</Chip>)
    expect(container.querySelector('.count')).toBeNull()
  })

  it('calls onClick when clicked', async () => {
    const handler = vi.fn()
    render(<Chip onClick={handler}>High</Chip>)
    await userEvent.click(screen.getByRole('button'))
    expect(handler).toHaveBeenCalledOnce()
  })

  it('does not call onClick when disabled', async () => {
    const handler = vi.fn()
    render(<Chip onClick={handler} disabled>Low</Chip>)
    await userEvent.click(screen.getByRole('button'))
    expect(handler).not.toHaveBeenCalled()
  })

  it('forwards className and type', () => {
    render(<Chip className="extra" type="submit">Go</Chip>)
    const chip = screen.getByRole('button')
    expect(chip).toHaveClass('chip', 'extra')
    expect(chip).toHaveAttribute('type', 'submit')
  })
})
