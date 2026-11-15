import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { expect, userEvent, within } from '@storybook/test'
import Modal, { type ModalProps } from './Modal'
import Button from '../../atoms/Button'
import Input from '../../atoms/Input'

const meta: Meta<typeof Modal> = {
  title: 'Organisms/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof Modal>

function Demo(props: Partial<ModalProps>) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Modal
        title="Add to Holiday 2026"
        description="Check the details before saving."
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Save item</Button>
          </>
        }
        {...props}
        open={open}
        onClose={() => setOpen(false)}
      >
        <Input aria-label="Title" defaultValue="Ray-Ban Meta Wayfarer (Gen 2)" />
      </Modal>
    </>
  )
}

export const Dialog: Story = {
  render: () => <Demo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Open' }))
    const body = within(canvasElement.ownerDocument.body)
    await expect(body.getByRole('dialog', { name: 'Add to Holiday 2026' })).toBeInTheDocument()
    await userEvent.keyboard('{Escape}')
    await expect(body.queryByRole('dialog')).toBeNull()
  },
}

export const Sheet: Story = { render: () => <Demo variant="sheet" title="Reserve this gift?" description="Other guests will see it's taken." /> }

export const Responsive: Story = { render: () => <Demo variant="responsive" /> }

export const Destructive: Story = {
  render: () => (
    <Demo
      title="Delete this item?"
      description="Guests who reserved it won't be told. This can't be undone."
      footer={<Button variant="ghost">Cancel</Button>}
    />
  ),
}
