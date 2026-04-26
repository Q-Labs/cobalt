import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ContactItem from './ContactItem'

describe('ContactItem', () => {
  it('renders label and value', () => {
    render(<ContactItem label="E" value="quincy@cloud129.dev" />)
    expect(screen.getByText('quincy@cloud129.dev')).toBeInTheDocument()
  })

  it('renders as anchor when href provided', () => {
    render(<ContactItem label="E" value="quincy@cloud129.dev" href="mailto:quincy@cloud129.dev" />)
    expect(screen.getByRole('link')).toHaveAttribute('href', 'mailto:quincy@cloud129.dev')
  })

  it('renders as span when no href', () => {
    const { container } = render(<ContactItem label="E" value="quincy@cloud129.dev" />)
    expect(container.querySelector('a')).not.toBeInTheDocument()
  })

  it('forwards className', () => {
    const { container } = render(<ContactItem label="E" value="test" className="extra" />)
    expect(container.firstChild).toHaveClass('extra')
  })
})
