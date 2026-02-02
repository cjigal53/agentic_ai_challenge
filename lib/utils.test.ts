import { cn } from './utils'

describe('cn utility', () => {
  it('combines multiple class names', () => {
    expect(cn('class1', 'class2', 'class3')).toBe('class1 class2 class3')
  })

  it('filters out falsy values', () => {
    expect(cn('class1', null, undefined, false, 'class2')).toBe('class1 class2')
  })

  it('handles empty input', () => {
    expect(cn()).toBe('')
  })

  it('handles only falsy values', () => {
    expect(cn(null, undefined, false)).toBe('')
  })
})
