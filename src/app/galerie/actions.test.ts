import { beforeEach, describe, expect, it, vi } from 'vitest';
import { loadByYear, loadThumbChunk } from './actions';
import { FEED_CHUNK, JUMP_AFTER, JUMP_BEFORE } from './constants';
import { getThumbChunk, getThumbWindow } from '@/lib/data/image/thumbs';

vi.mock('@/lib/data/image/thumbs', () => ({ getThumbChunk: vi.fn(), getThumbWindow: vi.fn() }));

const cursor = { createdAt: '2024-05-01T10:00:00.000Z', id: 7 };

describe('loadThumbChunk', () => {
  const chunk = { images: [], hasMore: false };

  beforeEach(() => {
    vi.mocked(getThumbChunk).mockReset().mockResolvedValue(chunk);
  });

  it.each(['older', 'newer'])(
    'loads a feed-sized chunk %s than a valid cursor',
    async (direction) => {
      await expect(loadThumbChunk(cursor, direction)).resolves.toBe(chunk);
      expect(getThumbChunk).toHaveBeenCalledWith(cursor, direction, FEED_CHUNK);
    },
  );

  it.each([
    [null, 'older'],
    [undefined, 'older'],
    [{}, 'older'],
    [{ ...cursor, id: 84848489489 }, 'older'],
    [{ ...cursor, createdAt: 'x' }, 'older'],
    [cursor, 'sideways'],
    [cursor, undefined],
  ])('rejects %j / %j without touching the database', async (input, direction) => {
    await expect(loadThumbChunk(input, direction)).rejects.toThrow();
    expect(getThumbChunk).not.toHaveBeenCalled();
  });
});

describe('loadByYear', () => {
  const window = { images: [], hasNewer: true, hasOlder: false };

  beforeEach(() => {
    vi.mocked(getThumbWindow).mockReset().mockResolvedValue(window);
  });

  it('loads the window around the start of a valid year', async () => {
    await expect(loadByYear(2019)).resolves.toBe(window);
    expect(getThumbWindow).toHaveBeenCalledWith(2019, JUMP_BEFORE, JUMP_AFTER);
  });

  it.each([undefined, null, '2019', 2019.5, 1800, 3000, NaN])(
    'rejects %j without touching the database',
    async (year) => {
      await expect(loadByYear(year)).rejects.toThrow();
      expect(getThumbWindow).not.toHaveBeenCalled();
    },
  );
});
