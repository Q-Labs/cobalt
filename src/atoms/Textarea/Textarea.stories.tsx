import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, within } from '@storybook/test'
import Textarea from './Textarea'

const meta: Meta<typeof Textarea> = {
  title: 'Atoms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { 'aria-label': 'Notes' },
}
export default meta

type Story = StoryObj<typeof Textarea>

export const Default: Story = { args: { placeholder: 'Size, color, anything that helps' } }
export const WithValue: Story = { args: { defaultValue: 'Matte black, clear lenses.' } }
export const Invalid: Story = { args: { defaultValue: 'This note is far too long…', invalid: true } }
export const Disabled: Story = { args: { placeholder: 'Notes are locked', disabled: true } }

export const Typing: Story = {
  args: { placeholder: 'Start typing...' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const textarea = canvas.getByRole('textbox')
    await userEvent.click(textarea)
    await userEvent.type(textarea, 'Matte black')
    await expect(textarea).toHaveValue('Matte black')
  },
}
