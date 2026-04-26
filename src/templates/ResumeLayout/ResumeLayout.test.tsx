import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ResumeLayout from './ResumeLayout'

describe('ResumeLayout', () => {
  it('renders nav, sidebar and main', () => {
    render(
      <ResumeLayout
        nav={<nav data-testid="nav" />}
        sidebar={<aside data-testid="sidebar" />}
      >
        <main data-testid="main">Content</main>
      </ResumeLayout>
    )
    expect(screen.getByTestId('nav')).toBeInTheDocument()
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    expect(screen.getByTestId('main')).toBeInTheDocument()
  })

  it('renders status bar when provided', () => {
    render(
      <ResumeLayout
        nav={<nav />}
        sidebar={<aside />}
        statusBar={<div data-testid="status" />}
      >
        <span />
      </ResumeLayout>
    )
    expect(screen.getByTestId('status')).toBeInTheDocument()
  })

  it('forwards className', () => {
    const { container } = render(
      <ResumeLayout nav={<nav />} sidebar={<aside />} className="extra">
        <span />
      </ResumeLayout>
    )
    expect(container.firstChild).toHaveClass('extra')
  })
})
