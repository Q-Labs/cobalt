import type { Meta, StoryObj } from '@storybook/react'
import Display from './Display'

const meta: Meta<typeof Display> = {
  title: 'Typography/Display',
  component: Display,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof Display>

export const TwoXL: Story = { args: { variant: '2xl', children: 'Cloud129 Technologies' } }
export const XL: Story = { args: { variant: 'xl', children: 'Cloud129 Technologies' } }
export const LG: Story = { args: { variant: 'lg', children: 'Cloud129 Technologies' } }
export const MD: Story = { args: { variant: 'md', children: 'Cloud129 Technologies' } }
export const SM: Story = { args: { variant: 'sm', children: 'Cloud129 Technologies' } }
