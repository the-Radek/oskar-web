import { prisma } from '../../prisma';
import type { ImageFeedCursor } from '../../validators/image-feed';
import { serialize, visible } from '../shared';
import { getImageChunk } from './images';
import { getThumbChunk } from './thumbs';
import type { ImageChunk, ImageLayout, ImageSlot, ImageSlotWindow } from './types';

const layoutSelect = { id: true, width: true, height: true, createdAt: true };

const startOf = (year: number) => new Date(Date.UTC(year, 0, 1));

/**
 * Between `year` and the year after it; id 0 puts an image exactly on the boundary in the newer.
 */
const endOf = (year: number): ImageFeedCursor => ({
  createdAt: startOf(year + 1).toISOString(),
  id: 0,
});

async function hasNewerThan(year: number) {
  return (await getImageChunk(endOf(year), 'newer', 1)).images.length > 0;
}

async function hasOlderThan({ createdAt, id }: ImageLayout) {
  return (await getImageChunk({ createdAt, id }, 'older', 1)).images.length > 0;
}

/**
 * Every published image of a UTC year, newest first, as layout only.
 */
export async function getYearLayout(year: number): Promise<ImageLayout[]> {
  const rows = await prisma.image.findMany({
    where: { ...visible, createdAt: { gte: startOf(year), lt: startOf(year + 1) } },
    orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    select: layoutSelect,
  });
  return rows.map(serialize);
}

/**
 * The whole nearest year that has images newer than `cursor`, as layout only. The year is always
 * loaded whole, so adding it above the feed never moves the images already there.
 *
 * @param cursor image to start from (not included), the newest one the feed shows
 * @returns images in gallery order (newest first), and whether there are more years above
 */
export async function getNewerYearLayout(
  cursor: ImageFeedCursor,
): Promise<ImageChunk<ImageLayout>> {
  const [nearest] = (await getImageChunk(cursor, 'newer', 1)).images;
  if (!nearest) return { images: [], hasMore: false };

  const year = new Date(nearest.createdAt).getUTCFullYear();
  const [images, hasMore] = await Promise.all([getYearLayout(year), hasNewerThan(year)]);
  return { images, hasMore };
}

/**
 * The feed around the start of `year`: the whole year as layout with the first `after` images from
 * the year start on loaded, the whole nearest newer year above it as layout with its last `before`
 * images loaded, and the older years after it. Years are whole so that nothing added later moves
 * the images already there.
 *
 * @param year UTC year to start at
 * @param before images to load from the newer year, nearest first
 * @param after images to load from the year start on
 */
export async function getYearWindow(
  year: number,
  before: number,
  after: number,
): Promise<ImageSlotWindow> {
  const [layout, above, thumbsBefore, thumbs] = await Promise.all([
    getYearLayout(year),
    getNewerYearLayout(endOf(year)),
    getThumbChunk(endOf(year), 'newer', before),
    getThumbChunk(endOf(year), 'older', after),
  ]);

  const loaded = new Map(
    [...thumbsBefore.images, ...thumbs.images].map((thumb) => [thumb.id, thumb]),
  );
  const fillIn = (image: ImageLayout): ImageSlot => loaded.get(image.id) ?? image;
  const inYear = new Set(layout.map((image) => image.id));
  const pastYear = thumbs.images.filter((thumb) => !inYear.has(thumb.id));
  const images = [...above.images.map(fillIn), ...layout.map(fillIn), ...pastYear];

  const last = images.at(-1);
  // the chunk only reaches beyond the year when it is shorter than that, and then knows the answer
  const hasOlder = pastYear.length > 0 ? thumbs.hasMore : !!last && (await hasOlderThan(last));
  return { images, hasNewer: above.hasMore, hasOlder };
}
