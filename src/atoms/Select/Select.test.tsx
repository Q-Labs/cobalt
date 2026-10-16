import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Select from './Select'

const currencies = [
  { value: 'USD', label: 'USD · US dollar' },
  { value: 'EUR', label: 'EUR · Euro' },
  { value: 'GBP', label: 'GBP · British pound', disabled: true },
]

describe('Select', () => {
  it('renders a native select', () => {
    render(<Select aria-label="Currency" options={currencies} />)
    expect(screen.getByRole('combobox', { name: 'Currency' }).tagName).toBe('SELECT')
  })

  it('renders an option per entry in options', () => {
    render(<Select aria-label="Currency" options={currencies} />)
    expect(screen.getAllByRole('option')).toHaveLength(3)
    expect(screen.getByRole('option', { name: 'EUR · Euro' })).toHaveValue('EUR')
  })

  it('marks disabled options', () => {
    render(<Select aria-label="Currency" options={currencies} />)
    expect(screen.getByRole('option', { name: 'GBP · British pound' })).toBeDisabled()
  })

  it('renders option children when no options prop is given', () => {
    render(
      <Select aria-label="Sort">
        <option value="priority">Priority</option>
        <option value="price">Price</option>
      </Select>,
    )
    expect(screen.getAllByRole('option')).toHaveLength(2)
  })

  it('shows a placeholder option that cannot be picked', () => {
    render(<Select aria-label="Currency" options={currencies} placeholder="Choose a currency" defaultValue="" />)
    const placeholder = screen.getByRole('option', { name: 'Choose a currency' })
    expect(placeholder).toHaveValue('')
    expect(placeholder).toBeDisabled()
    expect(screen.getByRole('combobox')).toHaveValue('')
  })

  it('calls onChange and updates the value when the user picks an option', async () => {
    const handler = vi.fn()
    render(<Select aria-label="Currency" options={currencies} onChange={handler} />)
    await userEvent.selectOptions(screen.getByRole('combobox'), 'EUR')
    expect(handler).toHaveBeenCalled()
    expect(screen.getByRole('combobox')).toHaveValue('EUR')
  })

  it('is not invalid by default', () => {
    render(<Select aria-label="Currency" options={currencies} />)
    const el = screen.getByRole('combobox')
    expect(el).not.toHaveAttribute('aria-invalid')
    expect(el).not.toHaveClass('select--invalid')
  })

  it('marks itself invalid when invalid is set', () => {
    render(<Select aria-label="Currency" options={currencies} invalid />)
    const el = screen.getByRole('combobox')
    expect(el).toHaveAttribute('aria-invalid', 'true')
    expect(el).toHaveClass('select--invalid')
  })

  it('applies disabled attribute', () => {
    render(<Select aria-label="Currency" options={currencies} disabled />)
    expect(screen.getByRole('combobox')).toBeDisabled()
  })

  it('applies className to the wrapper', () => {
    const { container } = render(<Select aria-label="Currency" options={currencies} className="extra" />)
    expect(container.firstChild).toHaveClass('wrapper', 'extra')
  })

  it('renders a decorative chevron', () => {
    const { container } = render(<Select aria-label="Currency" options={currencies} />)
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
  })
})
