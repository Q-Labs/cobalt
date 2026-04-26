import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Hero from './Hero'

describe('Hero', () => {
  it('renders headline', () => {
    render(<Hero headline="Building the future" />)
    expect(screen.getByText('Building the future')).toBeInTheDocument()
  })

  it('renders eyebrow when provided', () => {
    render(<Hero headline="Headline" eyebrow="Cloud129 Technologies" />)
    expect(screen.getByText('Cloud129 Technologies')).toBeInTheDocument()
  })

  it('renders sub when provided', () => {
    render(<Hero headline="Headline" sub="A brief description" />)
    expect(screen.getByText('A brief description')).toBeInTheDocument()
  })

  it('renders actions slot', () => {
    render(<Hero headline="Headline" actions={<button>Get started</button>} />)
    expect(screen.getByText('Get started')).toBeInTheDocument()
  })

  it('renders meta slot', () => {
    render(<Hero headline="Headline" meta={<span>v1.0</span>} />)
    expect(screen.getByText('v1.0')).toBeInTheDocument()
  })

  it('forwards className', () => {
    const { container } = render(<Hero headline="H" className="extra" />)
    expect(container.firstChild).toHaveClass('extra')
  })
})
