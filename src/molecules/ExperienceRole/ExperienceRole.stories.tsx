import type { Meta, StoryObj } from '@storybook/react'
import ExperienceRole from './ExperienceRole'

const meta: Meta<typeof ExperienceRole> = {
  title: 'Molecules/ExperienceRole',
  component: ExperienceRole,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof ExperienceRole>

export const Default: Story = {
  args: {
    title: 'Senior Software Engineer',
    period: '2022 – Present',
    current: true,
    bullets: ['Led architecture for real-time data pipeline', 'Reduced bundle size by 40%'],
    tags: ['TypeScript', 'React', 'Node.js'],
  },
}
export const Past: Story = {
  args: {
    title: 'Frontend Engineer',
    period: '2020 – 2022',
    bullets: ['Built design system from scratch', 'Mentored 3 junior engineers'],
  },
}
