import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SignalItem from './SignalItem'

describe('SignalItem', () => {
  it('renders title, body and timestamp', () => {
    render(<SignalItem title="Deploy complete" body="v2.1.0 is live" timestamp="2m ago" variant="active" />)
    expect(screen.getByText('Deploy complete')).toBeInTheDocument()
    expect(screen.getByText('v2.1.0 is live')).toBeInTheDocument()
    expect(screen.getByText('2m ago')).toBeInTheDocument()
  })

  it.each(['active', 'warning', 'danger', 'info'] as const)('applies variant %s class', (variant) => {
    const { container } = render(<SignalItem title="T" body="B" timestamp="1m" variant={variant} />)
    expect(container.querySelector(`[class*="signal--${variant}"]`)).toBeInTheDocument()
  })

  it('renders icon when provided', () => {
    render(<SignalItem title="T" body="B" timestamp="1m" variant="info" icon={<span data-testid="icon" />} />)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('forwards className', () => {
    const { container } = render(<SignalItem title="T" body="B" timestamp="1m" variant="info" className="extra" />)
    expect(container.firstChild).toHaveClass('extra')
  })
})
