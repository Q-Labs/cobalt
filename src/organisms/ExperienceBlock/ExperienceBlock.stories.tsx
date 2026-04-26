import type { Meta, StoryObj } from '@storybook/react'
import ExperienceBlock from './ExperienceBlock'
import ExperienceRole from '../../molecules/ExperienceRole'

const meta: Meta<typeof ExperienceBlock> = {
  title: 'Organisms/ExperienceBlock',
  component: ExperienceBlock,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof ExperienceBlock>

export const Default: Story = {
  args: {
    org: 'Cloud129 Technologies',
    tenure: '2020 – Present',
    children: (
      <>
        <ExperienceRole
          title="Founder & CTO"
          period="2020 – Present"
          current
          bullets={['Led architecture for distributed systems', 'Built and scaled engineering team']}
          tags={['TypeScript', 'React', 'AWS']}
        />
      </>
    ),
  },
}
