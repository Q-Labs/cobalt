import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import StatusDot from './StatusDot'

describe('StatusDot', () => {
  it('renders with default active variant', () => {
    const { container } = render(<StatusDot />)
    expect(container.firstChild).toHaveClass('status-dot', 'status-dot--active')
  })

  it.each(['active', 'warning', 'danger', 'info', 'offline'] as const)('applies variant %s', (variant) => {
    const { container } = render(<StatusDot variant={variant} />)
    expect(container.firstChild).toHaveClass(`status-dot--${variant}`)
  })

  it('applies animated class when animated prop is true', () => {
    const { container } = render(<StatusDot animated />)
    expect(container.firstChild).toHaveClass('status-dot--animated')
  })

  it('does not apply animated class by default', () => {
    const { container } = render(<StatusDot />)
    expect(container.firstChild).not.toHaveClass('status-dot--animated')
  })

  it('has accessible label via aria-label', () => {
    render(<StatusDot variant="active" aria-label="Online" />)
    expect(screen.getByLabelText('Online')).toBeInTheDocument()
  })

  it('forwards className', () => {
    const { container } = render(<StatusDot className="extra" />)
    expect(container.firstChild).toHaveClass('extra')
  })
})
