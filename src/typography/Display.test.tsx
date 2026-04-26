import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Display from './Display'

describe('Display', () => {
  it('renders children', () => {
    render(<Display variant="2xl">Hello</Display>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it.each(['2xl', 'xl', 'lg', 'md', 'sm'] as const)('applies variant %s class', (variant) => {
    const { container } = render(<Display variant={variant}>text</Display>)
    expect(container.firstChild).toHaveClass(`display-${variant}`)
  })

  it('renders as h1 by default', () => {
    render(<Display variant="xl">text</Display>)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders as custom element via as prop', () => {
    const { container } = render(<Display variant="xl" as="p">text</Display>)
    expect(container.querySelector('p')).toBeInTheDocument()
  })

  it('forwards className', () => {
    const { container } = render(<Display variant="xl" className="custom">text</Display>)
    expect(container.firstChild).toHaveClass('custom')
  })

  it('forwards additional props', () => {
    render(<Display variant="xl" data-testid="display">text</Display>)
    expect(screen.getByTestId('display')).toBeInTheDocument()
  })
})
