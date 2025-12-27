/**
 * Unit Tests: Utility Functions
 * 
 * Tests for the cn() utility function used for className merging.
 */

import { cn } from '@/lib/utils';

describe('cn() utility function', () => {
  it('should merge class names correctly', () => {
    const result = cn('text-base', 'font-bold');
    expect(result).toContain('text-base');
    expect(result).toContain('font-bold');
  });

  it('should handle conditional classes', () => {
    const isActive = true;
    const result = cn('base-class', isActive && 'active-class');
    expect(result).toContain('base-class');
    expect(result).toContain('active-class');
  });

  it('should handle false/null/undefined values', () => {
    const result = cn('base-class', false, null, undefined, 'valid-class');
    expect(result).toContain('base-class');
    expect(result).toContain('valid-class');
    expect(result).not.toContain('false');
    expect(result).not.toContain('null');
    expect(result).not.toContain('undefined');
  });

  it('should merge Tailwind classes correctly', () => {
    const result = cn('px-2 py-1', 'px-4');
    // The last px-* class should override the first
    expect(result).toContain('px-4');
    expect(result).not.toContain('px-2');
  });

  it('should handle empty input', () => {
    const result = cn();
    expect(result).toBe('');
  });

  it('should handle arrays of classes', () => {
    const result = cn(['class1', 'class2'], 'class3');
    expect(result).toContain('class1');
    expect(result).toContain('class2');
    expect(result).toContain('class3');
  });

  it('should handle objects with boolean values', () => {
    const result = cn({
      'always-included': true,
      'conditionally-included': true,
      'never-included': false,
    });
    expect(result).toContain('always-included');
    expect(result).toContain('conditionally-included');
    expect(result).not.toContain('never-included');
  });
});
