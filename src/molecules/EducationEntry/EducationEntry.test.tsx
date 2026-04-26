import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import EducationEntry from './EducationEntry'

describe('EducationEntry', () => {
  it('renders school, degree and period', () => {
    render(<EducationEntry school="MIT" degree="B.S. Computer Science" period="2014 – 2018" />)
    expect(screen.getByText('MIT')).toBeInTheDocument()
    expect(screen.getByText('B.S. Computer Science')).toBeInTheDocument()
    expect(screen.getByText('2014 – 2018')).toBeInTheDocument()
  })

  it('forwards className', () => {
    const { container } = render(<EducationEntry school="MIT" degree="CS" period="2018" className="extra" />)
    expect(container.firstChild).toHaveClass('extra')
  })
})
