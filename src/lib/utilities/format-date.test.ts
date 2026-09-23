import { describe, expect, it } from 'vitest';
import { formatDate } from './format-date';

describe('formatDate', () => {
  it('formats a date in long Czech style', () => {
    expect(formatDate(new Date('2026-07-13T00:00:00Z'))).toBe('13. července 2026');
  });
});
