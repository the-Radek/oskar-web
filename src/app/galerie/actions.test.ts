import { beforeEach, describe, expect, it, vi } from 'vitest';
import { loadByYear, loadNewerYear, loadOlderThumbs, loadThumbsByIds } from './actions';
import { FEED_CHUNK, JUMP_AFTER, JUMP_BEFORE } from './constants';
import { getNewerYearLayout, getYearWindow } from '@/lib/data/image/layout';
import { getThumbChunk, getThumbsByIds } from '@/lib/data/image/thumbs';
import { MAX_FEED_IMAGE_IDS } from '@/lib/validators/image-feed';

vi.mock('@/lib/data/image/thumbs', () => ({ getThumbChunk: vi.fn(), getThumbsByIds: vi.fn() }));
vi.mock('@/lib/data/image/layout', () => ({ getNewerYearLayout: vi.fn(), getYearWindow: vi.fn() }));

const cursor = { createdAt: '2024-05-01T10:00:00.000Z', id: 7 };

const badCursors = [
  null,
  undefined,
  {},
  { ...cursor, id: 84848489489 },
  { ...cursor, createdAt: 'x' },
];

describe('loadOlderThumbs', () => {
  const chunk = { images: [], hasMore: false };

  beforeEach(() => {
    vi.mocked(getThumbChunk).mockReset().mockResolvedValue(chunk);
  });

  it('loads a feed-sized chunk older than a valid cursor', async () => {
    await expect(loadOlderThumbs(cursor)).resolves.toBe(chunk);
    expect(getThumbChunk).toHaveBeenCalledWith(cursor, 'older', FEED_CHUNK);
  });

  it.each(badCursors)('rejects %j without touching the database', async (input) => {
    await expect(loadOlderThumbs(input)).rejects.toThrow();
    expect(getThumbChunk).not.toHaveBeenCalled();
  });
});

describe('loadNewerYear', () => {
  const chunk = { images: [], hasMore: true };

  beforeEach(() => {
    vi.mocked(getNewerYearLayout).mockReset().mockResolvedValue(chunk);
  });

  it('loads the year newer than a valid cursor', async () => {
    await expect(loadNewerYear(cursor)).resolves.toBe(chunk);
    expect(getNewerYearLayout).toHaveBeenCalledWith(cursor);
  });

  it.each(badCursors)('rejects %j without touching the database', async (input) => {
    await expect(loadNewerYear(input)).rejects.toThrow();
    expect(getNewerYearLayout).not.toHaveBeenCalled();
  });
});

describe('loadThumbsByIds', () => {
  const thumbs = [{ id: 1 }] as never;

  beforeEach(() => {
    vi.mocked(getThumbsByIds).mockReset().mockResolvedValue(thumbs);
  });

  it('loads the images of valid ids', async () => {
    await expect(loadThumbsByIds([1, 2])).resolves.toBe(thumbs);
    expect(getThumbsByIds).toHaveBeenCalledWith([1, 2]);
  });

  it.each([
    undefined,
    null,
    [],
    [0],
    ['1'],
    [1.5],
    '1',
    Array.from({ length: MAX_FEED_IMAGE_IDS + 1 }, (_, index) => index + 1),
  ])('rejects %j without touching the database', async (ids) => {
    await expect(loadThumbsByIds(ids)).rejects.toThrow();
    expect(getThumbsByIds).not.toHaveBeenCalled();
  });
});

describe('loadByYear', () => {
  const window = { images: [], hasNewer: true, hasOlder: false };

  beforeEach(() => {
    vi.mocked(getYearWindow).mockReset().mockResolvedValue(window);
  });

  it('loads the window at the start of a valid year', async () => {
    await expect(loadByYear(2019)).resolves.toBe(window);
    expect(getYearWindow).toHaveBeenCalledWith(2019, JUMP_BEFORE, JUMP_AFTER);
  });

  it.each([undefined, null, '2019', 2019.5, 1800, 3000, NaN])(
    'rejects %j without touching the database',
    async (year) => {
      await expect(loadByYear(year)).rejects.toThrow();
      expect(getYearWindow).not.toHaveBeenCalled();
    },
  );
});
