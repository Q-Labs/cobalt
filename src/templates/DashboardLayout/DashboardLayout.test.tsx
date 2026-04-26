import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import DashboardLayout from './DashboardLayout'

describe('DashboardLayout', () => {
  it('renders sidebar, topbar, and main content', () => {
    render(
      <DashboardLayout
        sidebar={<nav data-testid="sidebar" />}
        topbar={<div data-testid="topbar" />}
      >
        <div data-testid="main">Content</div>
      </DashboardLayout>
    )
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    expect(screen.getByTestId('topbar')).toBeInTheDocument()
    expect(screen.getByTestId('main')).toBeInTheDocument()
  })

  it('forwards className', () => {
    const { container } = render(
      <DashboardLayout sidebar={<nav />} topbar={<div />} className="extra">
        <span />
      </DashboardLayout>
    )
    expect(container.firstChild).toHaveClass('extra')
  })
})
