import type { Meta, StoryObj } from '@storybook/react'
import Topbar from './Topbar'
import Button from '../../atoms/Button'

const meta: Meta<typeof Topbar> = {
  title: 'Organisms/Topbar',
  component: Topbar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof Topbar>

export const Default: Story = { args: { title: 'Command Center' } }
export const WithMeta: Story = { args: { title: 'Command Center', meta: 'Last updated: 2m ago' } }
export const WithActions: Story = { args: { title: 'Command Center', actions: <Button size="sm">Refresh</Button> } }
