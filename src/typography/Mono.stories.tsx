import type { Meta, StoryObj } from '@storybook/react'
import Mono from './Mono'

const meta: Meta<typeof Mono> = {
  title: 'Typography/Mono',
  component: Mono,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof Mono>

export const Large: Story = { args: { variant: 'lg', children: 'v1.0.0 · cloud129.dev' } }
export const Medium: Story = { args: { variant: 'md', children: 'v1.0.0 · cloud129.dev' } }
export const Small: Story = { args: { variant: 'sm', children: 'v1.0.0 · cloud129.dev' } }
export const XSmall: Story = { args: { variant: 'xs', children: 'v1.0.0 · cloud129.dev' } }
