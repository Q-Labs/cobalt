import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Textarea from './Textarea'

describe('Textarea', () => {
  it('renders a textarea element', () => {
    render(<Textarea />)
    expect(screen.getByRole('textbox').tagName).toBe('TEXTAREA')
  })

  it('defaults to 3 rows', () => {
    render(<Textarea />)
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '3')
  })

  it('accepts a custom rows value', () => {
    render(<Textarea rows={6} />)
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '6')
  })

  it('renders placeholder', () => {
    render(<Textarea placeholder="Size, color, anything that helps" />)
    expect(screen.getByPlaceholderText('Size, color, anything that helps')).toBeInTheDocument()
  })

  it('calls onChange when the user types', async () => {
    const handler = vi.fn()
    render(<Textarea onChange={handler} />)
    await userEvent.type(screen.getByRole('textbox'), 'Matte black')
    expect(handler).toHaveBeenCalled()
    expect(screen.getByRole('textbox')).toHaveValue('Matte black')
  })

  it('is not invalid by default', () => {
    render(<Textarea />)
    const el = screen.getByRole('textbox')
    expect(el).not.toHaveAttribute('aria-invalid')
    expect(el).not.toHaveClass('textarea--invalid')
  })

  it('marks itself invalid when invalid is set', () => {
    render(<Textarea invalid />)
    const el = screen.getByRole('textbox')
    expect(el).toHaveAttribute('aria-invalid', 'true')
    expect(el).toHaveClass('textarea--invalid')
  })

  it('applies disabled attribute', () => {
    render(<Textarea disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('forwards className', () => {
    render(<Textarea className="extra" />)
    expect(screen.getByRole('textbox')).toHaveClass('textarea', 'extra')
  })

  it('forwards aria-label', () => {
    render(<Textarea aria-label="Notes for guests" />)
    expect(screen.getByRole('textbox', { name: 'Notes for guests' })).toBeInTheDocument()
  })
})
