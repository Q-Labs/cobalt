import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ProgressBar from './ProgressBar'

describe('ProgressBar', () => {
  it('renders with correct role', () => {
    render(<ProgressBar value={50} />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('sets aria-valuenow', () => {
    render(<ProgressBar value={75} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '75')
  })

  it('sets aria-valuemin and aria-valuemax', () => {
    render(<ProgressBar value={50} />)
    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveAttribute('aria-valuemin', '0')
    expect(bar).toHaveAttribute('aria-valuemax', '100')
  })

  it('defaults to accent color', () => {
    const { container } = render(<ProgressBar value={50} />)
    expect(container.firstChild).toHaveClass('progress--accent')
  })

  it.each(['accent', 'active', 'warning', 'danger'] as const)('applies color %s', (color) => {
    const { container } = render(<ProgressBar value={50} color={color} />)
    expect(container.firstChild).toHaveClass(`progress--${color}`)
  })

  it('clamps value to 0-100 range', () => {
    render(<ProgressBar value={150} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')
  })

  it('clamps negative value to 0', () => {
    render(<ProgressBar value={-10} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0')
  })

  it('forwards className', () => {
    const { container } = render(<ProgressBar value={50} className="extra" />)
    expect(container.firstChild).toHaveClass('extra')
  })
})
