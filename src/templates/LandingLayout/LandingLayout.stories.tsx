import type { Meta, StoryObj } from '@storybook/react'
import LandingLayout from './LandingLayout'
import TopNav from '../../organisms/TopNav'
import LogoMark from '../../atoms/LogoMark'
import Button from '../../atoms/Button'
import Hero from '../../organisms/Hero'

const meta: Meta<typeof LandingLayout> = {
  title: 'Templates/LandingLayout',
  component: LandingLayout,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof LandingLayout>

export const Default: Story = {
  args: {
    nav: (
      <TopNav
        logo={<LogoMark name="cloud129" size={28} />}
        actions={<Button size="sm">Sign up</Button>}
      />
    ),
    children: (
      <Hero
        eyebrow="Cloud129 Technologies"
        headline="Infrastructure for the next generation"
        sub="Building the tools, systems, and products that power the future."
        actions={
          <>
            <Button variant="primary" size="lg">Get started</Button>
            <Button variant="ghost" size="lg">Learn more</Button>
          </>
        }
      />
    ),
  },
}
