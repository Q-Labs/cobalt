import type { Meta, StoryObj } from '@storybook/react'
import NavItem from './NavItem'

const meta: Meta<typeof NavItem> = {
  title: 'Molecules/NavItem',
  component: NavItem,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof NavItem>

export const Default: Story = { args: { label: 'Dashboard' } }
export const Active: Story = { args: { label: 'Dashboard', active: true } }
export const WithCount: Story = { args: { label: 'Signals', count: 4 } }
export const WithCountOverflow: Story = { args: { label: 'Notifications', count: 120 } }
