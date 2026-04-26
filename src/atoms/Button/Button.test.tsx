import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Button from './Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('defaults to primary variant and md size', () => {
    const { container } = render(<Button>Click</Button>)
    expect(container.firstChild).toHaveClass('btn', 'btn--primary', 'btn--md')
  })

  it.each(['primary', 'ghost'] as const)('applies variant %s', (variant) => {
    const { container } = render(<Button variant={variant}>Click</Button>)
    expect(container.firstChild).toHaveClass(`btn--${variant}`)
  })

  it.each(['sm', 'md', 'lg'] as const)('applies size %s', (size) => {
    const { container } = render(<Button size={size}>Click</Button>)
    expect(container.firstChild).toHaveClass(`btn--${size}`)
  })

  it('calls onClick when clicked', async () => {
    const handler = vi.fn()
    render(<Button onClick={handler}>Click</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', async () => {
    const handler = vi.fn()
    render(<Button disabled onClick={handler}>Click</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(handler).not.toHaveBeenCalled()
  })

  it('applies disabled attribute', () => {
    render(<Button disabled>Click</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('renders as type submit', () => {
    render(<Button type="submit">Submit</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  it('forwards className', () => {
    const { container } = render(<Button className="extra">Click</Button>)
    expect(container.firstChild).toHaveClass('extra')
  })

  it('forwards aria-label', () => {
    render(<Button aria-label="close dialog">×</Button>)
    expect(screen.getByRole('button', { name: 'close dialog' })).toBeInTheDocument()
  })
})
