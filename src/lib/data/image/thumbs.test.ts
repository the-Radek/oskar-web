import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getThumbChunk, getThumbWindow } from './thumbs';
import { getImageChunk } from './images';

vi.mock('./images', () => ({ getImageChunk: vi.fn() }));
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

describe('getThumbWindow', () => {
  beforeEach(() => {
    vi.mocked(getImageChunk).mockReset();
  });

  it('starts at the boundary after the year, newer images first', async () => {
    vi.mocked(getImageChunk).mockImplementation(async (_cursor, direction) =>
      direction === 'newer'
        ? { images: [image(1), image(2)], hasMore: true }
        : { images: [image(3)], hasMore: false },
    );

    const window = await getThumbWindow(2019, 2, 1);

    const boundary = { createdAt: '2020-01-01T00:00:00.000Z', id: 0 };
    expect(getImageChunk).toHaveBeenCalledWith(boundary, 'newer', 2);
    expect(getImageChunk).toHaveBeenCalledWith(boundary, 'older', 1);
    expect(window.images.map((item) => item.id)).toEqual([1, 2, 3]);
    expect(window.hasNewer).toBe(true);
    expect(window.hasOlder).toBe(false);
  });
});
