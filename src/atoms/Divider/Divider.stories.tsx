import type { Meta, StoryObj } from '@storybook/react'
import Divider from './Divider'

const meta: Meta<typeof Divider> = {
  title: 'Atoms/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof Divider>

export const Horizontal: Story = { args: { orientation: 'horizontal' } }
