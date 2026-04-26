import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import FeatureCard from './FeatureCard'

describe('FeatureCard', () => {
  it('renders title and description', () => {
    render(<FeatureCard title="Dark first" description="Built for dark interfaces" />)
    expect(screen.getByText('Dark first')).toBeInTheDocument()
    expect(screen.getByText('Built for dark interfaces')).toBeInTheDocument()
  })

  it('renders icon when provided', () => {
    render(<FeatureCard title="T" description="D" icon={<span data-testid="icon" />} />)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('forwards className', () => {
    const { container } = render(<FeatureCard title="T" description="D" className="extra" />)
    expect(container.firstChild).toHaveClass('extra')
  })
})
