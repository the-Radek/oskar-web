import { describe, expect, it } from 'vitest';
import { PostSchema } from './post';

describe('PostSchema', () => {
  it('accepts a valid post', () => {
    const result = PostSchema.parse({ title: 'Ahoj', content: 'Tábor začíná!' });
    expect(result.title).toBe('Ahoj');
  });

  it('rejects an empty title', () => {
    expect(() => PostSchema.parse({ title: '', content: 'x' })).toThrow();
  });

  it('rejects an empty content', () => {
    expect(() => PostSchema.parse({ title: 'x', content: '' })).toThrow();
  });

  it('defaults createdAt to the current time on every parse, not just at schema creation', async () => {
    const first = PostSchema.parse({ title: 'a', content: 'b' }).createdAt;
    await new Promise((resolve) => setTimeout(resolve, 10));
    const second = PostSchema.parse({ title: 'a', content: 'b' }).createdAt;
    expect(second.getTime()).toBeGreaterThan(first.getTime());
  });
});
