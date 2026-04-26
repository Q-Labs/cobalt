import type { Meta, StoryObj } from '@storybook/react'
import PortfolioLayout from './PortfolioLayout'
import TopNav from '../../organisms/TopNav'
import LogoMark from '../../atoms/LogoMark'
import Button from '../../atoms/Button'

const meta: Meta<typeof PortfolioLayout> = {
  title: 'Templates/PortfolioLayout',
  component: PortfolioLayout,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof PortfolioLayout>

export const Default: Story = {
  args: {
    nav: (
      <TopNav
        logo={<LogoMark name="ring" size={28} />}
        actions={<Button size="sm">Get in touch</Button>}
      />
    ),
    children: <div style={{ color: 'var(--text-secondary)', padding: '64px 0', textAlign: 'center' }}>Portfolio content area</div>,
  },
}
