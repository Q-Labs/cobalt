import type { Meta, StoryObj } from '@storybook/react'
import UserBlock from './UserBlock'

const meta: Meta<typeof UserBlock> = {
  title: 'Molecules/UserBlock',
  component: UserBlock,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof UserBlock>

export const Default: Story = { args: { name: 'Quincy Iheme', status: 'Online' } }
export const WithAvatar: Story = { args: { name: 'Quincy Iheme', status: 'Online', avatarSrc: 'https://github.com/github.png' } }
