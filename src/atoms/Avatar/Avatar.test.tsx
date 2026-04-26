import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Avatar from './Avatar'

describe('Avatar', () => {
  it('renders image when src provided', () => {
    render(<Avatar src="https://example.com/photo.jpg" name="Quincy Iheme" />)
    expect(screen.getByRole('img', { name: 'Quincy Iheme' })).toBeInTheDocument()
  })

  it('renders initials when no src provided', () => {
    render(<Avatar name="Quincy Iheme" />)
    expect(screen.getByText('QI')).toBeInTheDocument()
  })

  it('renders single initial for single-word name', () => {
    render(<Avatar name="Quincy" />)
    expect(screen.getByText('Q')).toBeInTheDocument()
  })

  it('defaults to md size', () => {
    const { container } = render(<Avatar name="QI" />)
    expect(container.firstChild).toHaveClass('avatar--md')
  })

  it.each(['sm', 'md', 'lg'] as const)('applies size %s', (size) => {
    const { container } = render(<Avatar name="QI" size={size} />)
    expect(container.firstChild).toHaveClass(`avatar--${size}`)
  })

  it('forwards className', () => {
    const { container } = render(<Avatar name="QI" className="extra" />)
    expect(container.firstChild).toHaveClass('extra')
  })
})
