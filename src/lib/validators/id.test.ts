import { describe, expect, it } from 'vitest';
import { IdSchema, MAX_ID } from './id';

describe('IdSchema', () => {
  it.each([1, 42, MAX_ID])('accepts %d', (id) => {
    expect(IdSchema.parse(id)).toBe(id);
  });

  it.each([0, -1, 1.5, MAX_ID + 1, 84848489489, NaN, Infinity, '1', null])('rejects %j', (id) => {
    expect(IdSchema.safeParse(id).success).toBe(false);
  });
});
