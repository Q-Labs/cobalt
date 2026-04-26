import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ProjectCard from './ProjectCard'

describe('ProjectCard', () => {
  it('renders title and description', () => {
    render(<ProjectCard title="Cobalt DS" description="Design system for Cloud129" />)
    expect(screen.getByText('Cobalt DS')).toBeInTheDocument()
    expect(screen.getByText('Design system for Cloud129')).toBeInTheDocument()
  })

  it('renders badge when provided', () => {
    render(<ProjectCard title="DS" description="Desc" badge="active" />)
    expect(screen.getByText('active')).toBeInTheDocument()
  })

  it('renders tags when provided', () => {
    render(<ProjectCard title="DS" description="Desc" tags={['React', 'TypeScript']} />)
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('renders link when href provided', () => {
    render(<ProjectCard title="DS" description="Desc" href="https://cloud129.dev" linkLabel="View project" />)
    expect(screen.getByRole('link', { name: 'View project' })).toBeInTheDocument()
  })

  it('renders progress when provided', () => {
    render(<ProjectCard title="DS" description="Desc" progress={75} />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('uses href as link text when linkLabel is not provided', () => {
    render(<ProjectCard title="DS" description="Desc" href="https://cloud129.dev" />)
    expect(screen.getByRole('link', { name: 'https://cloud129.dev' })).toBeInTheDocument()
  })

  it('renders icon when provided', () => {
    render(<ProjectCard title="DS" description="Desc" icon={<span data-testid="icon" />} />)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('forwards className', () => {
    const { container } = render(<ProjectCard title="T" description="D" className="extra" />)
    expect(container.firstChild).toHaveClass('extra')
  })
})
