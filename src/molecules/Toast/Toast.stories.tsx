import type { Meta, StoryObj } from '@storybook/react'
import { expect, fn, userEvent, within } from '@storybook/test'
import Toast from './Toast'
import Button from '../../atoms/Button'

const meta: Meta<typeof Toast> = {
  title: 'Molecules/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof Toast>

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Added to Holiday 2026',
    description: 'Ray-Ban Meta Wayfarer (Gen 2)',
    action: <Button variant="ghost" size="sm">Undo</Button>,
  },
}
export const Warning: Story = {
  args: { variant: 'warning', title: "Couldn't read that page", description: 'Add the details yourself. The link is saved.' },
}
export const ErrorState: Story = {
  args: { variant: 'error', title: "Couldn't save. Try again.", action: <Button variant="ghost" size="sm">Retry</Button> },
}
export const Info: Story = { args: { variant: 'info', title: 'Share link copied' } }

export const Dismissible: Story = {
  args: { variant: 'info', title: 'Share link copied', onDismiss: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Dismiss' }))
    await expect(args.onDismiss).toHaveBeenCalled()
  },
}
