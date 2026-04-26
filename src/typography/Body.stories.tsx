import type { Meta, StoryObj } from '@storybook/react'
import Body from './Body'

const meta: Meta<typeof Body> = {
  title: 'Typography/Body',
  component: Body,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof Body>

export const Large: Story = { args: { variant: 'lg', children: 'Building products at the intersection of design and systems.' } }
export const Medium: Story = { args: { variant: 'md', children: 'Building products at the intersection of design and systems.' } }
export const Small: Story = { args: { variant: 'sm', children: 'Building products at the intersection of design and systems.' } }
