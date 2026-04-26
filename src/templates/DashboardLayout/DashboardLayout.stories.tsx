import type { Meta, StoryObj } from '@storybook/react'
import DashboardLayout from './DashboardLayout'
import Sidebar from '../../organisms/Sidebar'
import Topbar from '../../organisms/Topbar'
import LogoMark from '../../atoms/LogoMark'
import UserBlock from '../../molecules/UserBlock'
import NavItem from '../../molecules/NavItem'

const meta: Meta<typeof DashboardLayout> = {
  title: 'Templates/DashboardLayout',
  component: DashboardLayout,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof DashboardLayout>

export const Default: Story = {
  args: {
    sidebar: (
      <Sidebar
        logo={<LogoMark name="ring" size={28} />}
        footer={<UserBlock name="Quincy Iheme" status="Online" />}
      >
        <NavItem label="Dashboard" active />
        <NavItem label="Projects" />
        <NavItem label="Signals" count={4} />
        <NavItem label="Timeline" />
      </Sidebar>
    ),
    topbar: <Topbar title="Command Center" meta="Last updated: 2m ago" />,
    children: <div style={{ color: 'var(--text-secondary)', padding: '32px', textAlign: 'center' }}>Main content area</div>,
  },
}
