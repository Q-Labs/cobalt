import type { Meta, StoryObj } from '@storybook/react'
import StatItem from './StatItem'

const meta: Meta<typeof StatItem> = {
  title: 'Molecules/StatItem',
  component: StatItem,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof StatItem>

export const Default: Story = { args: { value: '12', label: 'Projects shipped' } }
export const Years: Story = { args: { value: '5+', label: 'Years experience' } }
