import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CobaltProvider from './CobaltProvider'

describe('CobaltProvider', () => {
  it('renders children', () => {
    render(
      <CobaltProvider>
        <span>Hello Cobalt</span>
      </CobaltProvider>
    )
    expect(screen.getByText('Hello Cobalt')).toBeInTheDocument()
  })

  it('sets data-theme to dark by default', () => {
    const { container } = render(
      <CobaltProvider>
        <span />
      </CobaltProvider>
    )
    expect(container.firstChild).toHaveAttribute('data-theme', 'dark')
  })

  it('sets data-theme to light when specified', () => {
    const { container } = render(
      <CobaltProvider theme="light">
        <span />
      </CobaltProvider>
    )
    expect(container.firstChild).toHaveAttribute('data-theme', 'light')
  })

  it('forwards className', () => {
    const { container } = render(
      <CobaltProvider className="extra">
        <span />
      </CobaltProvider>
    )
    expect(container.firstChild).toHaveClass('extra')
  })
})
