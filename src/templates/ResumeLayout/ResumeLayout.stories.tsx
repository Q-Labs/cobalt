import type { Meta, StoryObj } from '@storybook/react'
import ResumeLayout from './ResumeLayout'
import TopNav from '../../organisms/TopNav'
import StatusBar from '../../organisms/StatusBar'
import LogoMark from '../../atoms/LogoMark'

const meta: Meta<typeof ResumeLayout> = {
  title: 'Templates/ResumeLayout',
  component: ResumeLayout,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof ResumeLayout>

export const Default: Story = {
  args: {
    nav: <TopNav logo={<LogoMark name="ring" size={28} />} />,
    sidebar: <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Sidebar: contact, skills</div>,
    statusBar: <StatusBar badge="Available for work" meta="Updated April 2026" />,
    children: <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Main: experience, education</div>,
  },
}
