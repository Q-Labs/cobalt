import type { Meta, StoryObj } from '@storybook/react'
import StatusDot from './StatusDot'

const meta: Meta<typeof StatusDot> = {
  title: 'Atoms/StatusDot',
  component: StatusDot,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof StatusDot>

export const Active: Story = { args: { variant: 'active', 'aria-label': 'Online' } }
export const Warning: Story = { args: { variant: 'warning', 'aria-label': 'Degraded' } }
export const Danger: Story = { args: { variant: 'danger', 'aria-label': 'Offline' } }
export const Info: Story = { args: { variant: 'info', 'aria-label': 'Info' } }
export const Offline: Story = { args: { variant: 'offline', 'aria-label': 'Offline' } }
export const Animated: Story = { args: { variant: 'active', animated: true, 'aria-label': 'Live' } }
