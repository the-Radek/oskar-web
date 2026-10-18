import { describe, expect, it } from 'vitest';
import {
  ImageFeedCursorSchema,
  ImageFeedDirectionSchema,
  ImageFeedPostIdSchema,
} from './image-feed';
import { MAX_ID } from './id';

const cursor = { createdAt: '2024-05-01T10:00:00.000Z', id: 7 };

describe('ImageFeedCursorSchema', () => {
  it('accepts an ISO date and an id', () => {
    expect(ImageFeedCursorSchema.parse(cursor)).toEqual(cursor);
  });

  it.each([
    ['a non-ISO date', { ...cursor, createdAt: 'yesterday' }],
    ['a Date object', { ...cursor, createdAt: new Date() }],
    ['an id beyond the database range', { ...cursor, id: MAX_ID + 1 }],
    ['a non-positive id', { ...cursor, id: 0 }],
    ['a string id', { ...cursor, id: '7' }],
    ['a missing field', { id: 7 }],
    ['null', null],
    ['undefined', undefined],
  ])('rejects %s', (_, input) => {
    expect(ImageFeedCursorSchema.safeParse(input).success).toBe(false);
  });
});

describe('ImageFeedDirectionSchema', () => {
  it.each(['newer', 'older'])('accepts %s', (direction) => {
    expect(ImageFeedDirectionSchema.parse(direction)).toBe(direction);
  });

  it.each(['asc', '', 1, null])('rejects %j', (direction) => {
    expect(ImageFeedDirectionSchema.safeParse(direction).success).toBe(false);
  });
});

describe('ImageFeedPostIdSchema', () => {
  it('is optional', () => {
    expect(ImageFeedPostIdSchema.parse(undefined)).toBeUndefined();
  });

  it('accepts a valid id', () => {
    expect(ImageFeedPostIdSchema.parse(3)).toBe(3);
  });

  it.each([0, -2, 1.5, MAX_ID + 1, '3', null])('rejects %j', (id) => {
    expect(ImageFeedPostIdSchema.safeParse(id).success).toBe(false);
  });
});
