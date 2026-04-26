import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Mono from './Mono'

describe('Mono', () => {
  it('renders children', () => {
    render(<Mono>v1.0.0</Mono>)
    expect(screen.getByText('v1.0.0')).toBeInTheDocument()
  })

  it('defaults to md variant', () => {
    const { container } = render(<Mono>text</Mono>)
    expect(container.firstChild).toHaveClass('mono')
  })

  it.each(['lg', 'md', 'sm', 'xs'] as const)('applies variant %s class', (variant) => {
    const { container } = render(<Mono variant={variant}>text</Mono>)
    const expected = variant === 'md' ? 'mono' : `mono-${variant}`
    expect(container.firstChild).toHaveClass(expected)
  })

  it('renders as code by default', () => {
    const { container } = render(<Mono>text</Mono>)
    expect(container.querySelector('code')).toBeInTheDocument()
  })

  it('renders as custom element via as prop', () => {
    const { container } = render(<Mono as="span">text</Mono>)
    expect(container.querySelector('span')).toBeInTheDocument()
  })

  it('forwards className', () => {
    const { container } = render(<Mono className="custom">text</Mono>)
    expect(container.firstChild).toHaveClass('custom')
  })
})
