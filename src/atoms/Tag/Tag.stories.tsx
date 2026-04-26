import type { Meta, StoryObj } from '@storybook/react'
import Tag from './Tag'

const meta: Meta<typeof Tag> = {
  title: 'Atoms/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof Tag>

export const Default: Story = { args: { children: 'TypeScript' } }
export const React: Story = { args: { children: 'React' } }
export const NextJS: Story = { args: { children: 'Next.js' } }
