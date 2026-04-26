import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Divider from './Divider'

describe('Divider', () => {
  it('renders a separator', () => {
    const { container } = render(<Divider />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('defaults to horizontal orientation', () => {
    const { container } = render(<Divider />)
    expect(container.firstChild).toHaveClass('divider--horizontal')
  })

  it.each(['horizontal', 'vertical'] as const)('applies orientation %s', (orientation) => {
    const { container } = render(<Divider orientation={orientation} />)
    expect(container.firstChild).toHaveClass(`divider--${orientation}`)
  })

  it('forwards className', () => {
    const { container } = render(<Divider className="extra" />)
    expect(container.firstChild).toHaveClass('extra')
  })
})
