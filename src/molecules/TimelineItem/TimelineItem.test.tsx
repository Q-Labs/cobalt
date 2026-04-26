import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TimelineItem from './TimelineItem'

describe('TimelineItem', () => {
  it('renders title and date', () => {
    render(<TimelineItem title="Launched v1.0" date="Jan 2024" />)
    expect(screen.getByText('Launched v1.0')).toBeInTheDocument()
    expect(screen.getByText('Jan 2024')).toBeInTheDocument()
  })

  it('applies active class when active', () => {
    const { container } = render(<TimelineItem title="Current" date="Now" active />)
    expect(container.firstChild).toHaveClass('timeline-item--active')
  })

  it('does not apply active class by default', () => {
    const { container } = render(<TimelineItem title="Past" date="Then" />)
    expect(container.firstChild).not.toHaveClass('timeline-item--active')
  })

  it('renders last item without connector line when isLast', () => {
    const { container } = render(<TimelineItem title="T" date="D" isLast />)
    expect(container.querySelector('.line')).not.toBeInTheDocument()
  })

  it('renders connector line when not last', () => {
    const { container } = render(<TimelineItem title="T" date="D" />)
    expect(container.querySelector('.line')).toBeInTheDocument()
  })

  it('forwards className', () => {
    const { container } = render(<TimelineItem title="T" date="D" className="extra" />)
    expect(container.firstChild).toHaveClass('extra')
  })
})
