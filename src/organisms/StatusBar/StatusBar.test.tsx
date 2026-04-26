import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import StatusBar from './StatusBar'

describe('StatusBar', () => {
  it('renders badge text', () => {
    render(<StatusBar badge="Available for work" />)
    expect(screen.getByText('Available for work')).toBeInTheDocument()
  })

  it('renders meta when provided', () => {
    render(<StatusBar badge="Online" meta="Updated April 2026" />)
    expect(screen.getByText('Updated April 2026')).toBeInTheDocument()
  })

  it('forwards className', () => {
    const { container } = render(<StatusBar badge="Online" className="extra" />)
    expect(container.firstChild).toHaveClass('extra')
  })
})
