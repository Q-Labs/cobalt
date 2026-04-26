import type { Meta, StoryObj } from '@storybook/react'
import MetricCard from './MetricCard'

const meta: Meta<typeof MetricCard> = {
  title: 'Molecules/MetricCard',
  component: MetricCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof MetricCard>

export const Default: Story = { args: { value: '42', label: 'Projects' } }
export const WithDeltaUp: Story = { args: { value: '142', label: 'Commits', delta: '+12%', deltaDirection: 'up' } }
export const WithDeltaDown: Story = { args: { value: '3', label: 'Incidents', delta: '-40%', deltaDirection: 'down' } }
export const WithDeltaFlat: Story = { args: { value: '99.9%', label: 'Uptime', delta: '→ stable', deltaDirection: 'flat' } }
