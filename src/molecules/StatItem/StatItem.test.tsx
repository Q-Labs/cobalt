import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import StatItem from './StatItem'

describe('StatItem', () => {
  it('renders value and label', () => {
    render(<StatItem value="12" label="Projects shipped" />)
    expect(screen.getByText('12')).toBeInTheDocument()
    expect(screen.getByText('Projects shipped')).toBeInTheDocument()
  })

  it('forwards className', () => {
    const { container } = render(<StatItem value="12" label="Projects" className="extra" />)
    expect(container.firstChild).toHaveClass('extra')
  })
})
