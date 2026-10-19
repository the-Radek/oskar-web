import { beforeEach, describe, expect, it, vi } from 'vitest';
import { loadThumbChunk } from './actions';
import { FEED_CHUNK } from './constants';
import { getThumbChunk } from '@/lib/data/image/thumbs';

vi.mock('@/lib/data/image/thumbs', () => ({ getThumbChunk: vi.fn() }));

const cursor = { createdAt: '2024-05-01T10:00:00.000Z', id: 7 };
const chunk = { images: [], hasMore: false };

describe('loadThumbChunk', () => {
  beforeEach(() => {
    vi.mocked(getThumbChunk).mockReset().mockResolvedValue(chunk);
  });

  it('loads a feed-sized chunk after a valid cursor', async () => {
    await expect(loadThumbChunk(cursor)).resolves.toBe(chunk);
    expect(getThumbChunk).toHaveBeenCalledWith(cursor, FEED_CHUNK);
  });

  it.each([null, undefined, {}, { ...cursor, id: 84848489489 }, { ...cursor, createdAt: 'x' }])(
    'rejects %j without touching the database',
    async (input) => {
      await expect(loadThumbChunk(input)).rejects.toThrow();
      expect(getThumbChunk).not.toHaveBeenCalled();
    },
  );
});
