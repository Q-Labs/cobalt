import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import NavBadge from './NavBadge'

describe('NavBadge', () => {
  it('renders count', () => {
    render(<NavBadge count={3} />)
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('renders 99+ when count exceeds 99', () => {
    render(<NavBadge count={150} />)
    expect(screen.getByText('99+')).toBeInTheDocument()
  })

  it('forwards className', () => {
    const { container } = render(<NavBadge count={1} className="extra" />)
    expect(container.firstChild).toHaveClass('extra')
  })
})
