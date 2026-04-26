import type { Meta, StoryObj } from '@storybook/react'
import ProgressMini from './ProgressMini'

const meta: Meta<typeof ProgressMini> = {
  title: 'Atoms/ProgressMini',
  component: ProgressMini,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof ProgressMini>

export const Default: Story = { args: { value: 65 } }
export const Low: Story = { args: { value: 20 } }
export const Full: Story = { args: { value: 100 } }
