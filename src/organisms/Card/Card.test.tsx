import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Card from './Card'

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Content here</Card>)
    expect(screen.getByText('Content here')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(<Card title="System Status">Content</Card>)
    expect(screen.getByText('System Status')).toBeInTheDocument()
  })

  it('renders meta when provided', () => {
    render(<Card title="Status" meta="Updated 2m ago">Content</Card>)
    expect(screen.getByText('Updated 2m ago')).toBeInTheDocument()
  })

  it('does not render header when no title', () => {
    const { container } = render(<Card>Content</Card>)
    expect(container.querySelector('[class*="header"]')).not.toBeInTheDocument()
  })

  it('forwards className', () => {
    const { container } = render(<Card className="extra">Content</Card>)
    expect(container.firstChild).toHaveClass('extra')
  })
})
