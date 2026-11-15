import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import StrokeIcon, { type StrokeIconName } from './StrokeIcon'

const names: StrokeIconName[] = ['chevronDown', 'check', 'x', 'alertCircle', 'xCircle', 'info']

describe('StrokeIcon', () => {
  it.each(names)('renders the %s icon as a decorative svg', (name) => {
    const { container } = render(<StrokeIcon name={name} />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('data-icon', name)
    expect(svg).toHaveAttribute('aria-hidden', 'true')
    expect(svg?.childElementCount).toBeGreaterThan(0)
  })

  it('defaults to 16px', () => {
    const { container } = render(<StrokeIcon name="check" />)
    expect(container.querySelector('svg')).toHaveAttribute('width', '16')
  })

  it('accepts a size and className', () => {
    const { container } = render(<StrokeIcon name="check" size={20} className="ico" />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '20')
    expect(svg).toHaveAttribute('height', '20')
    expect(svg).toHaveClass('ico')
  })
})
