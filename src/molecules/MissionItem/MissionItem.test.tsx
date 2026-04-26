import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import MissionItem from './MissionItem'

describe('MissionItem', () => {
  it('renders name and progress percentage', () => {
    render(<MissionItem name="Build Cobalt DS" progress={72} status="active" />)
    expect(screen.getByText('Build Cobalt DS')).toBeInTheDocument()
    expect(screen.getByText('72%')).toBeInTheDocument()
  })

  it.each(['active', 'warning', 'danger', 'info'] as const)('applies status %s', (status) => {
    const { container } = render(<MissionItem name="Mission" progress={50} status={status} />)
    expect(container.querySelector(`[class*="status--${status}"]`)).toBeInTheDocument()
  })

  it('forwards className', () => {
    const { container } = render(<MissionItem name="M" progress={50} status="active" className="extra" />)
    expect(container.firstChild).toHaveClass('extra')
  })
})
