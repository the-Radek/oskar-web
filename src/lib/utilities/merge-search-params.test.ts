import { describe, expect, it } from 'vitest';
import { mergeSearchParams } from './merge-search-params';

describe('mergeSearchParams', () => {
  it('adds new params and keeps existing ones', () => {
    const result = mergeSearchParams(new URLSearchParams('pageSize=10'), { page: 2 });
    expect(result).toBe('page=2&pageSize=10');
  });

  it('overrides an existing param', () => {
    expect(mergeSearchParams(new URLSearchParams('page=1'), { page: 3 })).toBe('page=3');
  });

  it.each([null, undefined, ''])('removes a param set to %j', (value) => {
    const result = mergeSearchParams(new URLSearchParams('page=2&pageSize=10'), { page: value });
    expect(result).toBe('pageSize=10');
  });

  it('stringifies numbers and booleans', () => {
    expect(mergeSearchParams(new URLSearchParams(), { a: 1, b: true })).toBe('a=1&b=true');
  });

  it('sorts params alphabetically', () => {
    expect(mergeSearchParams(new URLSearchParams('z=1'), { a: 1 })).toBe('a=1&z=1');
  });

  it('does not mutate the given params', () => {
    const params = new URLSearchParams('page=1');
    mergeSearchParams(params, { page: 2 });
    expect(params.toString()).toBe('page=1');
  });
});
