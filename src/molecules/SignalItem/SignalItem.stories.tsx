import type { Meta, StoryObj } from '@storybook/react'
import SignalItem from './SignalItem'

const meta: Meta<typeof SignalItem> = {
  title: 'Molecules/SignalItem',
  component: SignalItem,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof SignalItem>

export const Active: Story = { args: { variant: 'active', title: 'Deploy complete', body: 'v2.1.0 is now live', timestamp: '2m ago' } }
export const Warning: Story = { args: { variant: 'warning', title: 'High memory usage', body: 'Worker-03 at 87%', timestamp: '15m ago' } }
export const Danger: Story = { args: { variant: 'danger', title: 'Build failed', body: 'TypeScript errors in Button.tsx', timestamp: '1h ago' } }
export const Info: Story = { args: { variant: 'info', title: 'PR merged', body: 'feat: add Cobalt tokens', timestamp: '3h ago' } }
