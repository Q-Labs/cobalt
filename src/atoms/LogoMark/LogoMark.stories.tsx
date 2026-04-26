import type { Meta, StoryObj } from '@storybook/react'
import LogoMark from './LogoMark'

const meta: Meta<typeof LogoMark> = {
  title: 'Atoms/LogoMark',
  component: LogoMark,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof LogoMark>

export const Ring: Story = { args: { name: 'ring', size: 64 } }
export const Open: Story = { args: { name: 'open', size: 64 } }
export const Cloud129: Story = { args: { name: 'cloud129', size: 64 } }
export const QuincyOS: Story = { args: { name: 'quincy-os', size: 64 } }
export const Small: Story = { args: { name: 'ring', size: 24 } }
export const Large: Story = { args: { name: 'ring', size: 96 } }
