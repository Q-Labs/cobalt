import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ProgressMini from './ProgressMini'

describe('ProgressMini', () => {
  it('renders with correct role', () => {
    render(<ProgressMini value={50} />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('sets aria-valuenow', () => {
    render(<ProgressMini value={60} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '60')
  })

  it('clamps value above 100', () => {
    render(<ProgressMini value={200} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')
  })

  it('clamps value below 0', () => {
    render(<ProgressMini value={-5} />)
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0')
  })

  it('forwards className', () => {
    const { container } = render(<ProgressMini value={50} className="extra" />)
    expect(container.firstChild).toHaveClass('extra')
  })
})
