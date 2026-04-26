import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import MetricCard from './MetricCard'

describe('MetricCard', () => {
  it('renders value and label', () => {
    render(<MetricCard value="42" label="Projects" />)
    expect(screen.getByText('42')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
  })

  it('renders delta when provided', () => {
    render(<MetricCard value="42" label="Projects" delta="+12%" />)
    expect(screen.getByText('+12%')).toBeInTheDocument()
  })

  it('does not render delta when not provided', () => {
    const { container } = render(<MetricCard value="42" label="Projects" />)
    expect(container.querySelector('[class*="delta"]')).not.toBeInTheDocument()
  })

  it.each(['up', 'down', 'flat'] as const)('applies delta direction %s', (direction) => {
    const { container } = render(<MetricCard value="42" label="Projects" delta="+5%" deltaDirection={direction} />)
    expect(container.querySelector(`[class*="delta--${direction}"]`)).toBeInTheDocument()
  })

  it('forwards className', () => {
    const { container } = render(<MetricCard value="42" label="Projects" className="extra" />)
    expect(container.firstChild).toHaveClass('extra')
  })
})
