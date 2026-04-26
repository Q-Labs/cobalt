import type { Meta, StoryObj } from '@storybook/react'
import MissionItem from './MissionItem'

const meta: Meta<typeof MissionItem> = {
  title: 'Molecules/MissionItem',
  component: MissionItem,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof MissionItem>

export const Active: Story = { args: { name: 'Build Cobalt DS', progress: 72, status: 'active' } }
export const Warning: Story = { args: { name: 'Ship portfolio v3', progress: 45, status: 'warning' } }
export const Danger: Story = { args: { name: 'Fix API timeout', progress: 10, status: 'danger' } }
