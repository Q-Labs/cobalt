import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import Input from './Input'

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = { args: { placeholder: 'Enter your email' } }
export const Email: Story = { args: { type: 'email', placeholder: 'you@cloud129.dev' } }
export const Disabled: Story = { args: { placeholder: 'Unavailable', disabled: true } }

export const Typing: Story = {
  args: { placeholder: 'Start typing...' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('textbox')
    await userEvent.click(input)
    await userEvent.type(input, 'cloud129.dev')
    await expect(input).toHaveValue('cloud129.dev')
  },
}
