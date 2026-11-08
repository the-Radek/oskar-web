import { beforeEach, describe, expect, it, vi } from 'vitest';
import { prisma } from '../../prisma';
import { getImageChunk } from './images';
import { getThumbChunk } from './thumbs';
import { getNewerYearLayout, getYearLayout, getYearWindow } from './layout';

vi.mock('../../prisma', () => ({ prisma: { image: { findMany: vi.fn() } } }));
vi.mock('./images', () => ({ getImageChunk: vi.fn() }));
vi.mock('./thumbs', () => ({ getThumbChunk: vi.fn() }));

const layout = (id: number, createdAt = '2019-06-01T00:00:00.000Z') => ({
  id,
  width: 3,
  height: 2,
  createdAt,
});
const thumb = (id: number, createdAt?: string) => ({
  ...layout(id, createdAt),
  src: `/${id}.jpg`,
  alt: '',
});
const chunk = <T>(images: T[], hasMore = false) => ({ images, hasMore });

const boundary = { createdAt: '2020-01-01T00:00:00.000Z', id: 0 };

beforeEach(() => {
  vi.mocked(prisma.image.findMany).mockReset();
  vi.mocked(getImageChunk).mockReset().mockResolvedValue(chunk([]));
  vi.mocked(getThumbChunk).mockReset();
});

function rows(...ids: number[]) {
  vi.mocked(prisma.image.findMany).mockResolvedValue(
    ids.map((id) => ({ ...layout(id), createdAt: new Date(layout(id).createdAt) })) as never,
  );
}

describe('getYearLayout', () => {
  it('lists the published images within the UTC year, newest first, with ISO dates', async () => {
    rows(2, 1);
    await expect(getYearLayout(2019)).resolves.toEqual([layout(2), layout(1)]);
    expect(prisma.image.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          published: true,
          deletedAt: null,
          createdAt: {
            gte: new Date('2019-01-01T00:00:00.000Z'),
            lt: new Date(boundary.createdAt),
          },
        }),
        orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      }),
    );
  });
});

describe('getNewerYearLayout', () => {
  const cursor = { createdAt: '2018-03-01T00:00:00.000Z', id: 9 };

  it('is empty when nothing is newer', async () => {
    await expect(getNewerYearLayout(cursor)).resolves.toEqual({ images: [], hasMore: false });
    expect(prisma.image.findMany).not.toHaveBeenCalled();
  });

  it('loads the whole year of the nearest newer image and tells about years above it', async () => {
    rows(2, 1);
    vi.mocked(getImageChunk).mockImplementation(async (from, direction) => {
      if (from?.id === cursor.id) return chunk([thumb(1)]);
      // the check for years above the loaded one
      expect(from).toEqual(boundary);
      expect(direction).toBe('newer');
      return chunk([thumb(5, '2022-01-01T00:00:00.000Z')]);
    });

    await expect(getNewerYearLayout(cursor)).resolves.toEqual({
      images: [layout(2), layout(1)],
      hasMore: true,
    });
    expect(getImageChunk).toHaveBeenCalledWith(cursor, 'newer', 1);
  });
});

describe('getYearWindow', () => {
  const NEWER = '2020-06-01T00:00:00.000Z';

  interface Setup {
    year?: number[];
    newerYear?: number[];
    moreAbove?: boolean;
    newerThumbs?: ReturnType<typeof thumb>[];
    olderThumbs: ReturnType<typeof thumb>[];
    olderHasMore?: boolean;
    olderAfterYear?: boolean;
  }

  function setup(options: Setup) {
    const { year = [], newerYear = [], moreAbove = false, newerThumbs = [] } = options;
    vi.mocked(prisma.image.findMany).mockImplementation((async ({ where }: never) => {
      const from = (where as { createdAt: { gte: Date } }).createdAt.gte.getUTCFullYear();
      const date = from === 2019 ? layout(0).createdAt : NEWER;
      return (from === 2019 ? year : newerYear).map((id) => ({
        ...layout(id),
        createdAt: new Date(date),
      }));
    }) as never);
    vi.mocked(getThumbChunk).mockImplementation(async (_cursor, direction) =>
      direction === 'newer'
        ? chunk(newerThumbs)
        : chunk(options.olderThumbs, options.olderHasMore ?? false),
    );
    vi.mocked(getImageChunk).mockImplementation(async (from, direction) => {
      if (direction === 'older') return chunk(options.olderAfterYear ? [thumb(0)] : []);
      if (from?.createdAt === '2020-01-01T00:00:00.000Z')
        return chunk(newerYear.length > 0 ? [thumb(newerYear[0], NEWER)] : []);
      return chunk(moreAbove ? [thumb(9, '2022-01-01T00:00:00.000Z')] : []);
    });
  }

  it('lays out the whole year and fills in the images that are loaded', async () => {
    setup({ year: [3, 2, 1], olderThumbs: [thumb(3), thumb(2)], olderHasMore: true });

    const window = await getYearWindow(2019, 5, 2);

    expect(getThumbChunk).toHaveBeenCalledWith(boundary, 'older', 2);
    expect(getThumbChunk).toHaveBeenCalledWith(boundary, 'newer', 5);
    expect(window.images).toEqual([thumb(3), thumb(2), layout(1)]);
    expect(window).toMatchObject({ hasNewer: false, hasOlder: false });
  });

  it('puts the whole newer year above, with the images nearest to the year loaded', async () => {
    setup({
      year: [3, 2],
      newerYear: [6, 5],
      newerThumbs: [thumb(5, NEWER)],
      olderThumbs: [thumb(3), thumb(2)],
    });

    const window = await getYearWindow(2019, 1, 2);

    expect(window.images).toEqual([layout(6, NEWER), thumb(5, NEWER), thumb(3), thumb(2)]);
    expect(window.hasNewer).toBe(false);
  });

  it('has newer images when there are more years above the newer one', async () => {
    setup({ year: [3], newerYear: [6], moreAbove: true, olderThumbs: [thumb(3)] });
    await expect(getYearWindow(2019, 1, 1)).resolves.toMatchObject({ hasNewer: true });
  });

  it('leaves out the newer images of a newer year that is not loaded whole', async () => {
    setup({ year: [3], newerThumbs: [thumb(7, NEWER)], olderThumbs: [thumb(3)] });
    const window = await getYearWindow(2019, 1, 1);
    expect(window.images.map((image) => image.id)).toEqual([3]);
  });

  it('has older images when something follows the last image of the year', async () => {
    setup({ year: [2, 1], olderThumbs: [thumb(2), thumb(1)], olderAfterYear: true });

    const window = await getYearWindow(2019, 1, 2);

    expect(getImageChunk).toHaveBeenCalledWith(
      { createdAt: layout(1).createdAt, id: 1 },
      'older',
      1,
    );
    expect(window.hasOlder).toBe(true);
  });

  it('continues into the older years when the year is shorter than the chunk', async () => {
    const older = thumb(0, '2018-01-01T00:00:00.000Z');
    setup({ year: [2, 1], olderThumbs: [thumb(2), thumb(1), older] });

    const window = await getYearWindow(2019, 1, 3);

    expect(window.images.map((image) => image.id)).toEqual([2, 1, 0]);
    expect(window.hasOlder).toBe(false);
    expect(getImageChunk).not.toHaveBeenCalledWith(expect.anything(), 'older', 1);
  });

  it('has nothing older for the last year', async () => {
    setup({ year: [1], olderThumbs: [thumb(1)] });
    await expect(getYearWindow(2019, 1, 5)).resolves.toMatchObject({ hasOlder: false });
  });
});
