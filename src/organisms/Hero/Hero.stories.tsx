import type { Meta, StoryObj } from '@storybook/react'
import Hero from './Hero'
import Button from '../../atoms/Button'

const meta: Meta<typeof Hero> = {
  title: 'Organisms/Hero',
  component: Hero,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof Hero>

export const Default: Story = {
  args: {
    eyebrow: 'Cloud129 Technologies',
    headline: 'Building infrastructure for the next generation',
    sub: 'Full-stack engineering, design systems, and product development.',
    actions: (
      <>
        <Button variant="primary" size="lg">View work</Button>
        <Button variant="ghost" size="lg">Get in touch</Button>
      </>
    ),
  },
}
