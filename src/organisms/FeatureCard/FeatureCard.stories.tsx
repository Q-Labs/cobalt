import type { Meta, StoryObj } from '@storybook/react'
import FeatureCard from './FeatureCard'

const meta: Meta<typeof FeatureCard> = {
  title: 'Organisms/FeatureCard',
  component: FeatureCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof FeatureCard>

export const Default: Story = {
  args: {
    title: 'Dark first',
    description: 'Built for dark interfaces with full light mode support via CSS tokens.',
  },
}
export const WithIcon: Story = {
  args: {
    title: 'Token-driven',
    description: 'Every value is a CSS custom property. Override anything without rebuilding.',
    icon: <span style={{ fontSize: '20px' }}>◈</span>,
  },
}
