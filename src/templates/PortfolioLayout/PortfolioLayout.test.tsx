import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import PortfolioLayout from './PortfolioLayout'

describe('PortfolioLayout', () => {
  it('renders nav and children', () => {
    render(
      <PortfolioLayout nav={<nav data-testid="nav" />}>
        <div data-testid="content">Content</div>
      </PortfolioLayout>
    )
    expect(screen.getByTestId('nav')).toBeInTheDocument()
    expect(screen.getByTestId('content')).toBeInTheDocument()
  })

  it('forwards className', () => {
    const { container } = render(
      <PortfolioLayout nav={<nav />} className="extra">
        <span />
      </PortfolioLayout>
    )
    expect(container.firstChild).toHaveClass('extra')
  })
})
