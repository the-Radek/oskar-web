import { describe, expect, it } from 'vitest';
import { parseId } from './parse-id';

describe('parseId', () => {
  it('parses a positive integer', () => {
    expect(parseId('42')).toBe(42);
  });

  it('accepts the largest database id', () => {
    expect(parseId('2147483647')).toBe(2147483647);
  });

  it.each(['abc', '1.5', '0', '-3', '', '2147483648', '84848489489', '1e3', '0x10', ' 5', '5 '])(
    'returns null for %j',
    (id) => {
      expect(parseId(id)).toBeNull();
    },
  );
});
