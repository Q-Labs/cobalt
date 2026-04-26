import type { Meta, StoryObj } from '@storybook/react'
import Avatar from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof Avatar>

export const Initials: Story = { args: { name: 'Quincy Iheme' } }
export const Small: Story = { args: { name: 'Quincy Iheme', size: 'sm' } }
export const Large: Story = { args: { name: 'Quincy Iheme', size: 'lg' } }
export const WithImage: Story = { args: { name: 'Quincy Iheme', src: 'https://github.com/github.png' } }
