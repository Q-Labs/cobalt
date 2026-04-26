import type { Meta, StoryObj } from '@storybook/react'
import Badge from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof Badge>

export const Default: Story = { args: { children: 'Default' } }
export const Active: Story = { args: { variant: 'active', children: 'Active' } }
export const Warning: Story = { args: { variant: 'warning', children: 'Warning' } }
export const Danger: Story = { args: { variant: 'danger', children: 'Danger' } }
export const Info: Story = { args: { variant: 'info', children: 'Info' } }
export const Shipped: Story = { args: { variant: 'shipped', children: 'Shipped' } }
export const WIP: Story = { args: { variant: 'wip', children: 'In Progress' } }
