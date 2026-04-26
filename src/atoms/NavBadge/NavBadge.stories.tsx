import type { Meta, StoryObj } from '@storybook/react'
import NavBadge from './NavBadge'

const meta: Meta<typeof NavBadge> = {
  title: 'Atoms/NavBadge',
  component: NavBadge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof NavBadge>

export const Few: Story = { args: { count: 3 } }
export const Many: Story = { args: { count: 12 } }
export const Overflow: Story = { args: { count: 150 } }
