import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import Button from './Button'

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = { args: { children: 'Launch Mission', variant: 'primary' } }
export const Ghost: Story = { args: { children: 'View Details', variant: 'ghost' } }
export const Small: Story = { args: { children: 'Action', size: 'sm' } }
export const Large: Story = { args: { children: 'Get Started', size: 'lg' } }
export const Disabled: Story = { args: { children: 'Unavailable', disabled: true } }

export const Clickable: Story = {
  args: { children: 'Click me' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: 'Click me' })
    await userEvent.click(button)
    await expect(button).toBeInTheDocument()
  },
}
