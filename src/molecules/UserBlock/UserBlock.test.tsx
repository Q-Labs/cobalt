import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import UserBlock from './UserBlock'

describe('UserBlock', () => {
  it('renders name and status', () => {
    render(<UserBlock name="Quincy Iheme" status="Online" />)
    expect(screen.getByText('Quincy Iheme')).toBeInTheDocument()
    expect(screen.getByText('Online')).toBeInTheDocument()
  })

  it('renders avatar', () => {
    render(<UserBlock name="Quincy Iheme" status="Online" />)
    expect(screen.getByText('QI')).toBeInTheDocument()
  })

  it('renders avatar with src', () => {
    render(<UserBlock name="Quincy Iheme" status="Online" avatarSrc="https://example.com/photo.jpg" />)
    expect(screen.getByRole('img', { name: 'Quincy Iheme' })).toBeInTheDocument()
  })

  it('forwards className', () => {
    const { container } = render(<UserBlock name="QI" status="Online" className="extra" />)
    expect(container.firstChild).toHaveClass('extra')
  })
})
