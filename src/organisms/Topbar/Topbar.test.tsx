import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Topbar from './Topbar'

describe('Topbar', () => {
  it('renders title', () => {
    render(<Topbar title="Command Center" />)
    expect(screen.getByText('Command Center')).toBeInTheDocument()
  })

  it('renders meta when provided', () => {
    render(<Topbar title="Command Center" meta="Last updated: 2m ago" />)
    expect(screen.getByText('Last updated: 2m ago')).toBeInTheDocument()
  })

  it('renders actions slot', () => {
    render(<Topbar title="Command Center" actions={<button>Refresh</button>} />)
    expect(screen.getByText('Refresh')).toBeInTheDocument()
  })

  it('forwards className', () => {
    const { container } = render(<Topbar title="CC" className="extra" />)
    expect(container.firstChild).toHaveClass('extra')
  })

  it('renders the title in a span by default, so existing usage is unchanged', () => {
    render(<Topbar title="Command Center" />)
    expect(screen.getByText('Command Center').tagName).toBe('SPAN')
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  it.each([1, 2, 3] as const)('renders the title as an h%i when titleAs asks for one', (level) => {
    render(<Topbar title="Command Center" titleAs={`h${level}`} />)
    expect(screen.getByRole('heading', { level, name: 'Command Center' })).toBeInTheDocument()
  })
})
