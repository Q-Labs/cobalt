import type { Meta, StoryObj } from '@storybook/react'
import SkillRow from './SkillRow'

const meta: Meta<typeof SkillRow> = {
  title: 'Molecules/SkillRow',
  component: SkillRow,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof SkillRow>

export const Default: Story = { args: { name: 'TypeScript', value: 92 } }
export const React: Story = { args: { name: 'React', value: 88 } }
export const NodeJS: Story = { args: { name: 'Node.js', value: 78 } }
