import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Body from './Body'

describe('Body', () => {
  it('renders children', () => {
    render(<Body>Hello</Body>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('defaults to md variant', () => {
    const { container } = render(<Body>text</Body>)
    expect(container.firstChild).toHaveClass('body-md')
  })

  it.each(['lg', 'md', 'sm'] as const)('applies variant %s class', (variant) => {
    const { container } = render(<Body variant={variant}>text</Body>)
    expect(container.firstChild).toHaveClass(`body-${variant}`)
  })

  it('renders as p by default', () => {
    const { container } = render(<Body>text</Body>)
    expect(container.querySelector('p')).toBeInTheDocument()
  })

  it('renders as custom element via as prop', () => {
    const { container } = render(<Body as="span">text</Body>)
    expect(container.querySelector('span')).toBeInTheDocument()
  })

  it('forwards className', () => {
    const { container } = render(<Body className="custom">text</Body>)
    expect(container.firstChild).toHaveClass('custom')
  })
})
