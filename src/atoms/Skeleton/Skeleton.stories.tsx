import type { Meta, StoryObj } from '@storybook/react'
import Skeleton from './Skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof Skeleton>

export const Text: Story = { args: { variant: 'text', width: 240 } }
export const Paragraph: Story = { args: { variant: 'text', lines: 3, width: 320 } }
export const Block: Story = { args: { variant: 'block', width: 280 } }
export const Circle: Story = { args: { variant: 'circle', width: 40, height: 40 } }

export const CardPlaceholder: Story = {
  render: () => (
    <div style={{ width: 260, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Skeleton variant="block" />
      <Skeleton width="40%" />
      <Skeleton lines={2} />
      <Skeleton width={72} height={18} />
    </div>
  ),
}
