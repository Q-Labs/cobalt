import type { Meta, StoryObj } from '@storybook/react'
import ContactItem from './ContactItem'

const meta: Meta<typeof ContactItem> = {
  title: 'Molecules/ContactItem',
  component: ContactItem,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof ContactItem>

export const Email: Story = { args: { label: 'E', value: 'quincy@cloud129.dev', href: 'mailto:quincy@cloud129.dev' } }
export const GitHub: Story = { args: { label: 'G', value: 'github.com/qiheme', href: 'https://github.com/qiheme' } }
export const NoLink: Story = { args: { label: 'L', value: 'Los Angeles, CA' } }
