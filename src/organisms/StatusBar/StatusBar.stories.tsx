import type { Meta, StoryObj } from '@storybook/react'
import StatusBar from './StatusBar'

const meta: Meta<typeof StatusBar> = {
  title: 'Organisms/StatusBar',
  component: StatusBar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof StatusBar>

export const Default: Story = { args: { badge: 'Available for work' } }
export const WithMeta: Story = { args: { badge: 'Online', meta: 'Updated April 2026 · cloud129.dev' } }
