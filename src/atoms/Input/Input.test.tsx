import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Input from './Input'

describe('Input', () => {
  it('renders an input element', () => {
    render(<Input />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders placeholder', () => {
    render(<Input placeholder="Enter email" />)
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument()
  })

  it('calls onChange when user types', async () => {
    const handler = vi.fn()
    render(<Input onChange={handler} />)
    await userEvent.type(screen.getByRole('textbox'), 'hello')
    expect(handler).toHaveBeenCalled()
  })

  it('renders with value', () => {
    render(<Input value="test" onChange={vi.fn()} />)
    expect(screen.getByRole('textbox')).toHaveValue('test')
  })

  it('applies disabled attribute', () => {
    render(<Input disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('renders type email', () => {
    render(<Input type="email" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email')
  })

  it('forwards className', () => {
    const { container } = render(<Input className="extra" />)
    expect(container.firstChild).toHaveClass('extra')
  })

  it('forwards aria-label', () => {
    render(<Input aria-label="Email address" />)
    expect(screen.getByRole('textbox', { name: 'Email address' })).toBeInTheDocument()
  })
})
