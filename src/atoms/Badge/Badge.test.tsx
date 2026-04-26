import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Badge from './Badge'

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>Active</Badge>)
    expect(screen.getByText('Active')).toBeInTheDocument()
  })

  it('defaults to default variant', () => {
    const { container } = render(<Badge>text</Badge>)
    expect(container.firstChild).toHaveClass('badge', 'badge--default')
  })

  it.each(['default', 'active', 'warning', 'danger', 'info', 'shipped', 'wip'] as const)(
    'applies variant %s',
    (variant) => {
      const { container } = render(<Badge variant={variant}>text</Badge>)
      expect(container.firstChild).toHaveClass(`badge--${variant}`)
    }
  )

  it('forwards className', () => {
    const { container } = render(<Badge className="extra">text</Badge>)
    expect(container.firstChild).toHaveClass('extra')
  })

  it('forwards additional props', () => {
    render(<Badge data-testid="badge">text</Badge>)
    expect(screen.getByTestId('badge')).toBeInTheDocument()
  })
})
