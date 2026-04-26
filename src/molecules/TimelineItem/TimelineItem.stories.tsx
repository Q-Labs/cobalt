import type { Meta, StoryObj } from '@storybook/react'
import TimelineItem from './TimelineItem'

const meta: Meta<typeof TimelineItem> = {
  title: 'Molecules/TimelineItem',
  component: TimelineItem,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof TimelineItem>

export const Default: Story = { args: { title: 'Launched v1.0', date: 'Jan 2024' } }
export const Active: Story = { args: { title: 'Building v2.0', date: 'Present', active: true } }
export const Last: Story = { args: { title: 'First commit', date: 'Aug 2023', isLast: true } }
