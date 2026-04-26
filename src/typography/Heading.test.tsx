import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Heading from './Heading'

describe('Heading', () => {
  it('renders children', () => {
    render(<Heading level={1}>Hello</Heading>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it.each([1, 2, 3, 4, 5, 6] as const)('renders as h%i', (level) => {
    render(<Heading level={level}>text</Heading>)
    expect(screen.getByRole('heading', { level })).toBeInTheDocument()
  })

  it('forwards className', () => {
    const { container } = render(<Heading level={2} className="custom">text</Heading>)
    expect(container.firstChild).toHaveClass('custom')
  })

  it('forwards additional props', () => {
    render(<Heading level={3} data-testid="heading">text</Heading>)
    expect(screen.getByTestId('heading')).toBeInTheDocument()
  })
})
