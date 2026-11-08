import { describe, expect, it, vi } from 'vitest';
import { getThumbChunk, getThumbsByIds } from './thumbs';
import { getImageChunk, getImagesByIds } from './images';

vi.mock('./images', () => ({ getImageChunk: vi.fn(), getImagesByIds: vi.fn() }));
vi.mock('../../utilities/blur-data-url', () => ({
  withBlurDataURL: async <T>(image: T) => ({ ...image, blurDataURL: 'blur' }),
}));

const image = (id: number) => ({
  id,
  src: `/${id}.jpg`,
  alt: '',
  width: 1,
  height: 1,
  createdAt: '2024-01-01T00:00:00.000Z',
});

describe('getThumbChunk', () => {
  it('adds blur placeholders and keeps the flag', async () => {
    vi.mocked(getImageChunk).mockResolvedValue({ images: [image(1)], hasMore: true });
    const chunk = await getThumbChunk(null, 'older', 5);
    expect(getImageChunk).toHaveBeenCalledWith(null, 'older', 5);
    expect(chunk).toEqual({ images: [{ ...image(1), blurDataURL: 'blur' }], hasMore: true });
  });
});

describe('getThumbsByIds', () => {
  it('adds blur placeholders to the images found', async () => {
    vi.mocked(getImagesByIds).mockResolvedValue([image(2), image(1)]);
    const thumbs = await getThumbsByIds([1, 2, 3]);
    expect(getImagesByIds).toHaveBeenCalledWith([1, 2, 3]);
    expect(thumbs).toEqual([
      { ...image(2), blurDataURL: 'blur' },
      { ...image(1), blurDataURL: 'blur' },
    ]);
  });
});
