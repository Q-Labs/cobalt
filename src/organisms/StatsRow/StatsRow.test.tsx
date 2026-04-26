import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import StatsRow from './StatsRow'

describe('StatsRow', () => {
  it('renders children', () => {
    render(<StatsRow><span>12 Projects</span></StatsRow>)
    expect(screen.getByText('12 Projects')).toBeInTheDocument()
  })

  it('forwards className', () => {
    const { container } = render(<StatsRow className="extra"><span /></StatsRow>)
    expect(container.firstChild).toHaveClass('extra')
  })
})
