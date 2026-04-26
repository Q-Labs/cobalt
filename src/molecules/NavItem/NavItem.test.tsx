import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import NavItem from './NavItem'

describe('NavItem', () => {
  it('renders label', () => {
    render(<NavItem label="Dashboard" />)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('renders icon when provided', () => {
    render(<NavItem label="Dashboard" icon={<span data-testid="icon" />} />)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('renders count badge when count provided', () => {
    render(<NavItem label="Signals" count={5} />)
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('does not render badge when count not provided', () => {
    render(<NavItem label="Dashboard" />)
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
  })

  it('applies active class when active', () => {
    const { container } = render(<NavItem label="Dashboard" active />)
    expect(container.firstChild).toHaveClass('nav-item--active')
  })

  it('does not apply active class by default', () => {
    const { container } = render(<NavItem label="Dashboard" />)
    expect(container.firstChild).not.toHaveClass('nav-item--active')
  })

  it('calls onClick when clicked', async () => {
    const handler = vi.fn()
    render(<NavItem label="Dashboard" onClick={handler} />)
    await userEvent.click(screen.getByText('Dashboard'))
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('forwards className', () => {
    const { container } = render(<NavItem label="Dashboard" className="extra" />)
    expect(container.firstChild).toHaveClass('extra')
  })
})
