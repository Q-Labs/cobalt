import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Skeleton from './Skeleton'

describe('Skeleton', () => {
  it('renders a hidden text bar by default', () => {
    const { container } = render(<Skeleton />)
    const el = container.firstChild as HTMLElement
    expect(el).toHaveClass('skeleton', 'skeleton--text')
    expect(el).toHaveAttribute('aria-hidden', 'true')
  })

  it.each(['text', 'block', 'circle'] as const)('applies the %s variant', (variant) => {
    const { container } = render(<Skeleton variant={variant} />)
    expect(container.firstChild).toHaveClass(`skeleton--${variant}`)
  })

  it('turns numeric width and height into pixels', () => {
    const { container } = render(<Skeleton variant="circle" width={40} height={40} />)
    const el = container.firstChild as HTMLElement
    expect(el.style.width).toBe('40px')
    expect(el.style.height).toBe('40px')
  })

  it('passes string width and height through', () => {
    const { container } = render(<Skeleton width="60%" height="1rem" />)
    const el = container.firstChild as HTMLElement
    expect(el.style.width).toBe('60%')
    expect(el.style.height).toBe('1rem')
  })

  it('leaves size to CSS when width and height are omitted', () => {
    const { container } = render(<Skeleton />)
    const el = container.firstChild as HTMLElement
    expect(el.style.width).toBe('')
    expect(el.style.height).toBe('')
  })

  it('renders several lines for a paragraph, the last one shorter', () => {
    const { container } = render(<Skeleton lines={3} />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass('lines')
    expect(wrapper).toHaveAttribute('aria-hidden', 'true')
    const bars = wrapper.querySelectorAll('.skeleton--text')
    expect(bars).toHaveLength(3)
    expect(bars[2]).toHaveClass('skeleton--last')
    expect(bars[0]).not.toHaveClass('skeleton--last')
  })

  it('ignores lines for non-text variants', () => {
    const { container } = render(<Skeleton variant="block" lines={3} />)
    expect(container.querySelectorAll('.skeleton')).toHaveLength(1)
  })

  it('forwards className and other attributes', () => {
    const { container } = render(<Skeleton className="extra" data-testid="sk" />)
    expect(container.firstChild).toHaveClass('extra')
    expect(container.firstChild).toHaveAttribute('data-testid', 'sk')
  })

  it('forwards className to the wrapper for multi-line skeletons', () => {
    const { container } = render(<Skeleton lines={2} className="extra" />)
    expect(container.firstChild).toHaveClass('lines', 'extra')
  })
})
