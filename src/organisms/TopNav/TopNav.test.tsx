import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TopNav from './TopNav'

describe('TopNav', () => {
  it('renders logo slot', () => {
    render(<TopNav logo={<span data-testid="logo" />} />)
    expect(screen.getByTestId('logo')).toBeInTheDocument()
  })

  it('renders children as nav links', () => {
    render(<TopNav logo={<span />}><a href="#">About</a></TopNav>)
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('renders actions slot', () => {
    render(<TopNav logo={<span />} actions={<button>Sign in</button>} />)
    expect(screen.getByText('Sign in')).toBeInTheDocument()
  })

  it('forwards className', () => {
    const { container } = render(<TopNav logo={<span />} className="extra" />)
    expect(container.firstChild).toHaveClass('extra')
  })
})
