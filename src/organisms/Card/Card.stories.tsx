import type { Meta, StoryObj } from '@storybook/react'
import Card from './Card'

const meta: Meta<typeof Card> = {
  title: 'Organisms/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = { args: { children: 'Card content goes here.' } }
export const WithTitle: Story = { args: { title: 'System Status', children: 'All systems operational.' } }
export const WithTitleAndMeta: Story = { args: { title: 'Active Missions', meta: 'Updated 2m ago', children: 'Mission list here.' } }
