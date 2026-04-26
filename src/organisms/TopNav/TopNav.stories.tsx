import type { Meta, StoryObj } from '@storybook/react'
import TopNav from './TopNav'
import LogoMark from '../../atoms/LogoMark'
import Button from '../../atoms/Button'

const meta: Meta<typeof TopNav> = {
  title: 'Organisms/TopNav',
  component: TopNav,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof TopNav>

export const Default: Story = {
  args: {
    logo: <LogoMark name="ring" size={28} />,
    actions: <Button size="sm">Get in touch</Button>,
    children: (
      <>
        <a href="#" style={{ color: 'var(--text-secondary)', fontSize: '14px', padding: '6px 12px', borderRadius: '6px', textDecoration: 'none' }}>Work</a>
        <a href="#" style={{ color: 'var(--text-secondary)', fontSize: '14px', padding: '6px 12px', borderRadius: '6px', textDecoration: 'none' }}>About</a>
      </>
    ),
  },
}
