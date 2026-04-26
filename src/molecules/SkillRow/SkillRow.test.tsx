import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SkillRow from './SkillRow'

describe('SkillRow', () => {
  it('renders skill name', () => {
    render(<SkillRow name="TypeScript" value={90} />)
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('renders progress bar', () => {
    render(<SkillRow name="TypeScript" value={90} />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('forwards className', () => {
    const { container } = render(<SkillRow name="TS" value={50} className="extra" />)
    expect(container.firstChild).toHaveClass('extra')
  })
})
