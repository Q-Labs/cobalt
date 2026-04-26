import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Label from './Label'

describe('Label', () => {
  it('renders children', () => {
    render(<Label>Hello</Label>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('defaults to md variant', () => {
    const { container } = render(<Label>text</Label>)
    expect(container.firstChild).toHaveClass('label-md')
  })

  it.each(['lg', 'md', 'sm'] as const)('applies variant %s class', (variant) => {
    const { container } = render(<Label variant={variant}>text</Label>)
    expect(container.firstChild).toHaveClass(`label-${variant}`)
  })

  it('renders as span by default', () => {
    const { container } = render(<Label>text</Label>)
    expect(container.querySelector('span')).toBeInTheDocument()
  })

  it('renders as custom element via as prop', () => {
    const { container } = render(<Label as="p">text</Label>)
    expect(container.querySelector('p')).toBeInTheDocument()
  })

  it('forwards className', () => {
    const { container } = render(<Label className="custom">text</Label>)
    expect(container.firstChild).toHaveClass('custom')
  })

  it('forwards additional props', () => {
    render(<Label data-testid="lbl">text</Label>)
    expect(screen.getByTestId('lbl')).toBeInTheDocument()
  })
})
