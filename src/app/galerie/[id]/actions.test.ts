import { beforeEach, describe, expect, it, vi } from 'vitest';
import { loadImageChunk } from './actions';
import { LIGHTBOX_CHUNK } from '../constants';
import { getImageChunk } from '@/lib/data/image/images';

vi.mock('@/lib/data/image/images', () => ({ getImageChunk: vi.fn() }));

const cursor = { createdAt: '2024-05-01T10:00:00.000Z', id: 7 };
const chunk = { images: [], hasMore: true };

describe('loadImageChunk', () => {
  beforeEach(() => {
    vi.mocked(getImageChunk).mockReset().mockResolvedValue(chunk);
  });

  it('loads a lightbox-sized chunk in the given direction', async () => {
    await expect(loadImageChunk(cursor, 'newer')).resolves.toBe(chunk);
    expect(getImageChunk).toHaveBeenCalledWith(cursor, 'newer', LIGHTBOX_CHUNK, undefined);
  });

  it('scopes the chunk to a post', async () => {
    await loadImageChunk(cursor, 'older', 3);
    expect(getImageChunk).toHaveBeenCalledWith(cursor, 'older', LIGHTBOX_CHUNK, 3);
  });

  it.each([
    ['cursor', [null, 'older']],
    ['cursor id out of range', [{ ...cursor, id: 84848489489 }, 'older']],
    ['direction', [cursor, 'sideways']],
    ['missing direction', [cursor, undefined]],
    ['post id out of range', [cursor, 'older', 84848489489]],
    ['post id type', [cursor, 'older', '3']],
  ] as const)('rejects a bad %s without touching the database', async (_, args) => {
    await expect(loadImageChunk(...(args as [unknown, unknown, unknown]))).rejects.toThrow();
    expect(getImageChunk).not.toHaveBeenCalled();
  });
});
