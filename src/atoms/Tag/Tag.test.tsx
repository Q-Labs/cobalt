import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Tag from './Tag'

describe('Tag', () => {
  it('renders children', () => {
    render(<Tag>TypeScript</Tag>)
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('has tag class', () => {
    const { container } = render(<Tag>React</Tag>)
    expect(container.firstChild).toHaveClass('tag')
  })

  it('forwards className', () => {
    const { container } = render(<Tag className="extra">React</Tag>)
    expect(container.firstChild).toHaveClass('extra')
  })

  it('forwards additional props', () => {
    render(<Tag data-testid="tag">React</Tag>)
    expect(screen.getByTestId('tag')).toBeInTheDocument()
  })
})
