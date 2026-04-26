import type { Meta, StoryObj } from '@storybook/react'
import ProgressBar from './ProgressBar'

const meta: Meta<typeof ProgressBar> = {
  title: 'Atoms/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof ProgressBar>

export const Default: Story = { args: { value: 65 } }
export const Accent: Story = { args: { value: 75, color: 'accent' } }
export const ActiveGreen: Story = { args: { value: 90, color: 'active' } }
export const WarningAmber: Story = { args: { value: 45, color: 'warning' } }
export const DangerRed: Story = { args: { value: 20, color: 'danger' } }
