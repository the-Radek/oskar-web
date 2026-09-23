import { describe, expect, it } from 'vitest';
import { ImageSchema } from './image';

const valid = { src: '/galerie/1.jpg', alt: 'photo', width: 100, height: 100 };

describe('ImageSchema', () => {
  it('accepts a valid image', () => {
    expect(ImageSchema.parse(valid).src).toBe(valid.src);
  });

  it.each(['src', 'alt'])('rejects an empty %s', (field) => {
    expect(() => ImageSchema.parse({ ...valid, [field]: '' })).toThrow();
  });

  it.each(['width', 'height'])('rejects a non-positive %s', (field) => {
    expect(() => ImageSchema.parse({ ...valid, [field]: 0 })).toThrow();
  });

  it('defaults createdAt to the current time on every parse', async () => {
    const first = ImageSchema.parse(valid).createdAt;
    await new Promise((resolve) => setTimeout(resolve, 10));
    const second = ImageSchema.parse(valid).createdAt;
    expect(second.getTime()).toBeGreaterThan(first.getTime());
  });
});
