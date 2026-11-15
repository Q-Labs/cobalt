import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import SegmentedControl from './SegmentedControl'

const priorities = [
  { value: 'HIGH', label: 'High' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'LOW', label: 'Low' },
]

const meta: Meta<typeof SegmentedControl> = {
  title: 'Molecules/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { 'aria-label': 'Priority', options: priorities, defaultValue: 'MEDIUM' },
}
export default meta

type Story = StoryObj<typeof SegmentedControl>

export const Default: Story = {}
export const Small: Story = { args: { size: 'sm' } }
export const WithDisabledOption: Story = {
  args: { options: [priorities[0], { ...priorities[1], disabled: true }, priorities[2]], defaultValue: 'HIGH' },
}
export const Disabled: Story = { args: { disabled: true } }

export const KeyboardNavigation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const medium = canvas.getByRole('radio', { name: 'Medium' })
    await userEvent.click(medium)
    await userEvent.keyboard('{ArrowRight}')
    await expect(canvas.getByRole('radio', { name: 'Low' })).toHaveAttribute('aria-checked', 'true')
  },
}
