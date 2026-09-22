import { describe, expect, it } from 'vitest';
import { dateSchema } from './date';

describe('dateSchema', () => {
  it('parses a valid date string', () => {
    const result = dateSchema.parse('2026-07-13');
    expect(result).toBeInstanceOf(Date);
    expect(result.getUTCFullYear()).toBe(2026);
  });

  it('rejects an invalid date string', () => {
    expect(() => dateSchema.parse('not-a-date')).toThrow();
  });
});
