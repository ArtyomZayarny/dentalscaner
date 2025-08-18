import { cn } from '@/lib/utils'

describe('Utils', () => {
  describe('cn function', () => {
    it('combines class names correctly', () => {
      const result = cn('class1', 'class2', 'class3')
      expect(result).toBe('class1 class2 class3')
    })

    it('handles conditional classes', () => {
      const result = cn('base-class', true && 'conditional-class', false && 'hidden-class')
      expect(result).toBe('base-class conditional-class')
    })

    it('handles empty or undefined values', () => {
      const result = cn('base-class', '', undefined, null, 'valid-class')
      expect(result).toBe('base-class valid-class')
    })
  })
}) 