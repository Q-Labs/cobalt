import type { Meta, StoryObj } from '@storybook/react'
import EducationEntry from './EducationEntry'

const meta: Meta<typeof EducationEntry> = {
  title: 'Molecules/EducationEntry',
  component: EducationEntry,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof EducationEntry>

export const Default: Story = { args: { school: 'MIT', degree: 'B.S. Computer Science', period: '2014 – 2018' } }
