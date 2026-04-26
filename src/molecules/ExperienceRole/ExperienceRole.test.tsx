import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ExperienceRole from './ExperienceRole'

describe('ExperienceRole', () => {
  it('renders title and period', () => {
    render(<ExperienceRole title="Senior Engineer" period="2022 – Present" />)
    expect(screen.getByText('Senior Engineer')).toBeInTheDocument()
    expect(screen.getByText('2022 – Present')).toBeInTheDocument()
  })

  it('renders bullets when provided', () => {
    render(<ExperienceRole title="Engineer" period="2022–Now" bullets={['Built X', 'Shipped Y']} />)
    expect(screen.getByText('Built X')).toBeInTheDocument()
    expect(screen.getByText('Shipped Y')).toBeInTheDocument()
  })

  it('renders tags when provided', () => {
    render(<ExperienceRole title="Engineer" period="2022–Now" tags={['React', 'TypeScript']} />)
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('applies current class when current', () => {
    const { container } = render(<ExperienceRole title="Engineer" period="Now" current />)
    expect(container.firstChild).toHaveClass('role--current')
  })

  it('forwards className', () => {
    const { container } = render(<ExperienceRole title="T" period="P" className="extra" />)
    expect(container.firstChild).toHaveClass('extra')
  })
})
