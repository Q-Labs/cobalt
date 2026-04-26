import type { Meta, StoryObj } from '@storybook/react'
import QuickStatRow from './QuickStatRow'

const meta: Meta<typeof QuickStatRow> = {
  title: 'Molecules/QuickStatRow',
  component: QuickStatRow,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof QuickStatRow>

export const Default: Story = { args: { label: 'Uptime', value: '99.9%' } }
export const PRsMerged: Story = { args: { label: 'PRs merged', value: '147' } }
