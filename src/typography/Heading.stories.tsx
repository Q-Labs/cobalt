import type { Meta, StoryObj } from '@storybook/react'
import Heading from './Heading'

const meta: Meta<typeof Heading> = {
  title: 'Typography/Heading',
  component: Heading,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof Heading>

export const H1: Story = { args: { level: 1, children: 'Command Center' } }
export const H2: Story = { args: { level: 2, children: 'Command Center' } }
export const H3: Story = { args: { level: 3, children: 'Command Center' } }
export const H4: Story = { args: { level: 4, children: 'Command Center' } }
export const H5: Story = { args: { level: 5, children: 'Command Center' } }
export const H6: Story = { args: { level: 6, children: 'Command Center' } }
