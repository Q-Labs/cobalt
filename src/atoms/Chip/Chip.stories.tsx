import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { expect, userEvent, within } from '@storybook/test'
import Chip from './Chip'

const meta: Meta<typeof Chip> = {
  title: 'Atoms/Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof Chip>

export const Default: Story = { args: { children: 'High', count: 2 } }
export const Selected: Story = { args: { children: 'All', count: 8, selected: true } }
export const WithoutCount: Story = { args: { children: 'Medium' } }
export const Disabled: Story = { args: { children: 'Low', count: 0, disabled: true } }

const filters = [
  { id: 'all', label: 'All', count: 8 },
  { id: 'high', label: 'High', count: 2 },
  { id: 'medium', label: 'Medium', count: 3 },
  { id: 'low', label: 'Low', count: 3 },
]

function FilterRow() {
  const [active, setActive] = useState('all')
  return (
    <div role="group" aria-label="Filter by priority" style={{ display: 'flex', gap: 8 }}>
      {filters.map((f) => (
        <Chip key={f.id} count={f.count} selected={active === f.id} onClick={() => setActive(f.id)}>
          {f.label}
        </Chip>
      ))}
    </div>
  )
}

export const FilterGroup: Story = {
  render: () => <FilterRow />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const high = canvas.getByRole('button', { name: 'High 2' })
    await userEvent.click(high)
    await expect(high).toHaveAttribute('aria-pressed', 'true')
    await expect(canvas.getByRole('button', { name: 'All 8' })).toHaveAttribute('aria-pressed', 'false')
  },
}
