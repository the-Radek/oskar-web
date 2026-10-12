import { describe, expect, it } from 'vitest';
import { parseId } from './parse-id';

describe('parseId', () => {
  it('parses a positive integer', () => {
    expect(parseId('42')).toBe(42);
  });

  it.each(['abc', '1.5', '0', '-3', ''])('responds with 404 for %j', (id) => {
    expect(() => parseId(id)).toThrow();
  });
});
