import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Sidebar from './Sidebar'

describe('Sidebar', () => {
  it('renders logo slot', () => {
    render(<Sidebar logo={<span data-testid="logo" />} />)
    expect(screen.getByTestId('logo')).toBeInTheDocument()
  })

  it('renders nav children', () => {
    render(<Sidebar logo={<span />}><span>Dashboard</span></Sidebar>)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('renders footer slot', () => {
    render(<Sidebar logo={<span />} footer={<span>User Name</span>} />)
    expect(screen.getByText('User Name')).toBeInTheDocument()
  })

  it('forwards className', () => {
    const { container } = render(<Sidebar logo={<span />} className="extra" />)
    expect(container.firstChild).toHaveClass('extra')
  })
})
