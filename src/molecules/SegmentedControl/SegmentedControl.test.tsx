import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, it, expect, vi } from 'vitest'
import SegmentedControl from './SegmentedControl'

const priorities = [
  { value: 'HIGH', label: 'High' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'LOW', label: 'Low' },
]

describe('SegmentedControl', () => {
  it('renders a labelled radiogroup with one radio per option', () => {
    render(<SegmentedControl aria-label="Priority" options={priorities} />)
    expect(screen.getByRole('radiogroup', { name: 'Priority' })).toBeInTheDocument()
    expect(screen.getAllByRole('radio')).toHaveLength(3)
  })

  it('checks the defaultValue option', () => {
    render(<SegmentedControl aria-label="Priority" options={priorities} defaultValue="MEDIUM" />)
    expect(screen.getByRole('radio', { name: 'Medium' })).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByRole('radio', { name: 'High' })).toHaveAttribute('aria-checked', 'false')
  })

  it('makes only the checked option tabbable', () => {
    render(<SegmentedControl aria-label="Priority" options={priorities} defaultValue="MEDIUM" />)
    expect(screen.getByRole('radio', { name: 'Medium' })).toHaveAttribute('tabindex', '0')
    expect(screen.getByRole('radio', { name: 'High' })).toHaveAttribute('tabindex', '-1')
  })

  it('makes the first enabled option tabbable when nothing is checked', () => {
    const options = [{ value: 'A', label: 'A', disabled: true }, ...priorities]
    render(<SegmentedControl aria-label="Priority" options={options} />)
    expect(screen.getByRole('radio', { name: 'High' })).toHaveAttribute('tabindex', '0')
    expect(screen.getByRole('radio', { name: 'A' })).toHaveAttribute('tabindex', '-1')
  })

  it('keeps a disabled checked option out of the tab order', () => {
    const options = [
      { value: 'HIGH', label: 'High' },
      { value: 'MEDIUM', label: 'Medium', disabled: true },
      { value: 'LOW', label: 'Low' },
    ]
    render(<SegmentedControl aria-label="Priority" options={options} defaultValue="MEDIUM" />)
    expect(screen.getByRole('radio', { name: 'Medium' })).toHaveAttribute('tabindex', '-1')
    expect(screen.getByRole('radio', { name: 'High' })).toHaveAttribute('tabindex', '0')
  })

  it("calls the consumer's onKeyDown and still moves focus", async () => {
    const onKeyDown = vi.fn()
    render(<SegmentedControl aria-label="Priority" options={priorities} defaultValue="HIGH" onKeyDown={onKeyDown} />)
    screen.getByRole('radio', { name: 'High' }).focus()
    await userEvent.keyboard('{ArrowRight}')
    expect(onKeyDown).toHaveBeenCalledOnce()
    expect(screen.getByRole('radio', { name: 'Medium' })).toHaveFocus()
  })

  it("lets the consumer's onKeyDown opt out with preventDefault", async () => {
    const onChange = vi.fn()
    render(
      <SegmentedControl
        aria-label="Priority"
        options={priorities}
        defaultValue="HIGH"
        onChange={onChange}
        onKeyDown={(e) => e.preventDefault()}
      />,
    )
    screen.getByRole('radio', { name: 'High' }).focus()
    await userEvent.keyboard('{ArrowRight}')
    expect(screen.getByRole('radio', { name: 'High' })).toHaveFocus()
    expect(onChange).not.toHaveBeenCalled()
  })

  it('selects an option on click and reports the change (uncontrolled)', async () => {
    const onChange = vi.fn()
    render(<SegmentedControl aria-label="Priority" options={priorities} defaultValue="MEDIUM" onChange={onChange} />)
    await userEvent.click(screen.getByRole('radio', { name: 'High' }))
    expect(onChange).toHaveBeenCalledWith('HIGH')
    expect(screen.getByRole('radio', { name: 'High' })).toHaveAttribute('aria-checked', 'true')
  })

  it('does not report a change when the checked option is clicked again', async () => {
    const onChange = vi.fn()
    render(<SegmentedControl aria-label="Priority" options={priorities} defaultValue="MEDIUM" onChange={onChange} />)
    await userEvent.click(screen.getByRole('radio', { name: 'Medium' }))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('follows the value prop when controlled', async () => {
    const onChange = vi.fn()
    const { rerender } = render(
      <SegmentedControl aria-label="Priority" options={priorities} value="LOW" onChange={onChange} />,
    )
    await userEvent.click(screen.getByRole('radio', { name: 'High' }))
    expect(onChange).toHaveBeenCalledWith('HIGH')
    expect(screen.getByRole('radio', { name: 'Low' })).toHaveAttribute('aria-checked', 'true')
    rerender(<SegmentedControl aria-label="Priority" options={priorities} value="HIGH" onChange={onChange} />)
    expect(screen.getByRole('radio', { name: 'High' })).toHaveAttribute('aria-checked', 'true')
  })

  it('works controlled from a parent', async () => {
    function Parent() {
      const [v, setV] = useState('MEDIUM')
      return <SegmentedControl aria-label="Priority" options={priorities} value={v} onChange={setV} />
    }
    render(<Parent />)
    await userEvent.click(screen.getByRole('radio', { name: 'Low' }))
    expect(screen.getByRole('radio', { name: 'Low' })).toHaveAttribute('aria-checked', 'true')
  })

  it('moves and selects with arrow keys, wrapping at the ends', async () => {
    const onChange = vi.fn()
    render(<SegmentedControl aria-label="Priority" options={priorities} defaultValue="HIGH" onChange={onChange} />)
    screen.getByRole('radio', { name: 'High' }).focus()

    await userEvent.keyboard('{ArrowRight}')
    expect(screen.getByRole('radio', { name: 'Medium' })).toHaveFocus()
    expect(screen.getByRole('radio', { name: 'Medium' })).toHaveAttribute('aria-checked', 'true')

    await userEvent.keyboard('{ArrowDown}{ArrowDown}')
    expect(screen.getByRole('radio', { name: 'High' })).toHaveFocus()

    await userEvent.keyboard('{ArrowLeft}')
    expect(screen.getByRole('radio', { name: 'Low' })).toHaveFocus()

    await userEvent.keyboard('{ArrowUp}')
    expect(screen.getByRole('radio', { name: 'Medium' })).toHaveFocus()
    expect(onChange).toHaveBeenLastCalledWith('MEDIUM')
  })

  it('jumps with Home and End', async () => {
    render(<SegmentedControl aria-label="Priority" options={priorities} defaultValue="MEDIUM" />)
    screen.getByRole('radio', { name: 'Medium' }).focus()
    await userEvent.keyboard('{End}')
    expect(screen.getByRole('radio', { name: 'Low' })).toHaveFocus()
    await userEvent.keyboard('{Home}')
    expect(screen.getByRole('radio', { name: 'High' })).toHaveFocus()
  })

  it('skips disabled options when moving', async () => {
    const options = [
      { value: 'HIGH', label: 'High' },
      { value: 'MEDIUM', label: 'Medium', disabled: true },
      { value: 'LOW', label: 'Low' },
    ]
    render(<SegmentedControl aria-label="Priority" options={options} defaultValue="HIGH" />)
    expect(screen.getByRole('radio', { name: 'Medium' })).toBeDisabled()
    screen.getByRole('radio', { name: 'High' }).focus()
    await userEvent.keyboard('{ArrowRight}')
    expect(screen.getByRole('radio', { name: 'Low' })).toHaveFocus()
  })

  it('ignores other keys', async () => {
    const onChange = vi.fn()
    render(<SegmentedControl aria-label="Priority" options={priorities} defaultValue="HIGH" onChange={onChange} />)
    screen.getByRole('radio', { name: 'High' }).focus()
    await userEvent.keyboard('a')
    expect(screen.getByRole('radio', { name: 'High' })).toHaveFocus()
    expect(onChange).not.toHaveBeenCalled()
  })

  it('does nothing on keys when every option is disabled', () => {
    const onChange = vi.fn()
    const options = priorities.map((o) => ({ ...o, disabled: true }))
    render(<SegmentedControl aria-label="Priority" options={options} onChange={onChange} />)
    fireEvent.keyDown(screen.getByRole('radiogroup'), { key: 'ArrowRight' })
    expect(onChange).not.toHaveBeenCalled()
  })

  it('disables every option when disabled', async () => {
    const onChange = vi.fn()
    render(<SegmentedControl aria-label="Priority" options={priorities} defaultValue="MEDIUM" disabled onChange={onChange} />)
    expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-disabled', 'true')
    screen.getAllByRole('radio').forEach((r) => expect(r).toBeDisabled())
    await userEvent.click(screen.getByRole('radio', { name: 'High' }))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('applies the size and className', () => {
    render(<SegmentedControl aria-label="Priority" options={priorities} size="sm" className="extra" />)
    expect(screen.getByRole('radiogroup')).toHaveClass('segmented', 'segmented--sm', 'extra')
  })

  it('defaults to the md size', () => {
    render(<SegmentedControl aria-label="Priority" options={priorities} />)
    expect(screen.getByRole('radiogroup')).toHaveClass('segmented--md')
  })
})
