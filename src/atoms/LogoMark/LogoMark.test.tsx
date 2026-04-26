import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import LogoMark from './LogoMark'

describe('LogoMark', () => {
  it.each(['ring', 'open', 'cloud129', 'quincy-os'] as const)('renders %s variant', (name) => {
    const { container } = render(<LogoMark name={name} />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('applies size as width and height', () => {
    const { container } = render(<LogoMark name="ring" size={48} />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '48')
    expect(svg).toHaveAttribute('height', '48')
  })

  it('defaults to 32px size', () => {
    const { container } = render(<LogoMark name="ring" />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '32')
  })

  it('forwards className to svg', () => {
    const { container } = render(<LogoMark name="ring" className="extra" />)
    expect(container.querySelector('svg')).toHaveClass('extra')
  })
})
