import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ExperienceBlock from './ExperienceBlock'

describe('ExperienceBlock', () => {
  it('renders org name and tenure', () => {
    render(<ExperienceBlock org="Cloud129 Technologies" tenure="2020 – Present" />)
    expect(screen.getByText('Cloud129 Technologies')).toBeInTheDocument()
    expect(screen.getByText('2020 – Present')).toBeInTheDocument()
  })

  it('renders children (roles)', () => {
    render(
      <ExperienceBlock org="Cloud129" tenure="2020–Now">
        <span>CTO</span>
      </ExperienceBlock>
    )
    expect(screen.getByText('CTO')).toBeInTheDocument()
  })

  it('forwards className', () => {
    const { container } = render(<ExperienceBlock org="O" tenure="T" className="extra" />)
    expect(container.firstChild).toHaveClass('extra')
  })
})
