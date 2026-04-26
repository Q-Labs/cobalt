import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import QuickStatRow from './QuickStatRow'

describe('QuickStatRow', () => {
  it('renders label and value', () => {
    render(<QuickStatRow label="Uptime" value="99.9%" />)
    expect(screen.getByText('Uptime')).toBeInTheDocument()
    expect(screen.getByText('99.9%')).toBeInTheDocument()
  })

  it('forwards className', () => {
    const { container } = render(<QuickStatRow label="L" value="V" className="extra" />)
    expect(container.firstChild).toHaveClass('extra')
  })
})
