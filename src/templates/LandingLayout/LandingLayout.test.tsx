import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import LandingLayout from './LandingLayout'

describe('LandingLayout', () => {
  it('renders nav and children', () => {
    render(
      <LandingLayout nav={<nav data-testid="nav" />}>
        <section data-testid="section">Hero</section>
      </LandingLayout>
    )
    expect(screen.getByTestId('nav')).toBeInTheDocument()
    expect(screen.getByTestId('section')).toBeInTheDocument()
  })

  it('forwards className', () => {
    const { container } = render(
      <LandingLayout nav={<nav />} className="extra">
        <span />
      </LandingLayout>
    )
    expect(container.firstChild).toHaveClass('extra')
  })
})
