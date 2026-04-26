import type { Meta, StoryObj } from '@storybook/react'
import ProjectCard from './ProjectCard'

const meta: Meta<typeof ProjectCard> = {
  title: 'Organisms/ProjectCard',
  component: ProjectCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta

type Story = StoryObj<typeof ProjectCard>

export const Default: Story = {
  args: {
    title: 'Cobalt Design System',
    description: 'A complete React component library for the Quincy OS design system.',
    badge: 'active',
    tags: ['React', 'TypeScript', 'CSS Modules'],
    href: 'https://github.com/qiheme/design-system',
    linkLabel: 'View on GitHub →',
    progress: 72,
  },
}
export const Shipped: Story = {
  args: {
    title: 'Cloud129 API',
    description: 'REST API for Cloud129 services.',
    badge: 'shipped',
    tags: ['Node.js', 'PostgreSQL'],
    progress: 100,
  },
}
