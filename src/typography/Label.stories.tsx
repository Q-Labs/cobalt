import type { Meta, StoryObj } from '@storybook/react'
import Label from './Label'

const meta: Meta<typeof Label> = {
  title: 'Typography/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof Label>

export const Large: Story = { args: { variant: 'lg', children: 'System Status' } }
export const Medium: Story = { args: { variant: 'md', children: 'System Status' } }
export const Small: Story = { args: { variant: 'sm', children: 'System Status' } }
