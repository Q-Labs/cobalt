import type { Meta, StoryObj } from '@storybook/react'
import Sidebar from './Sidebar'
import NavItem from '../../molecules/NavItem'
import UserBlock from '../../molecules/UserBlock'
import LogoMark from '../../atoms/LogoMark'

const meta: Meta<typeof Sidebar> = {
  title: 'Organisms/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof Sidebar>

export const Default: Story = {
  args: {
    logo: <LogoMark name="ring" size={28} />,
    footer: <UserBlock name="Quincy Iheme" status="Online" />,
    children: (
      <>
        <NavItem label="Dashboard" active />
        <NavItem label="Projects" />
        <NavItem label="Signals" count={4} />
        <NavItem label="Timeline" />
      </>
    ),
  },
}
