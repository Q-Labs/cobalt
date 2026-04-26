import type { Meta, StoryObj } from '@storybook/react'
import StatsRow from './StatsRow'
import StatItem from '../../molecules/StatItem'

const meta: Meta<typeof StatsRow> = {
  title: 'Organisms/StatsRow',
  component: StatsRow,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof StatsRow>

export const Default: Story = {
  args: {
    children: (
      <>
        <StatItem value="12" label="Projects shipped" />
        <StatItem value="5+" label="Years experience" />
        <StatItem value="3" label="Open source libs" />
        <StatItem value="99.9%" label="Uptime SLA" />
      </>
    ),
  },
}
