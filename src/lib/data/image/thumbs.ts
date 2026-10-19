import { withBlurDataURL } from '../../utilities/blur-data-url';
import type { ImageFeedCursor, ImageFeedDirection } from '../../validators/image-feed';
import { getImageChunk } from './images';
import type { ImageChunk, ImageThumb, ImageThumbWindow } from './types';

/**
 * A chunk of the gallery feed with blur placeholders.
 *
 * @param cursor image to start from (not included), or null for the very start
 * @param direction `older` continues down the feed, `newer` goes back up
 * @param limit chunk size
 * @returns images in gallery order (newest first)
 */
export async function getThumbChunk(
  cursor: ImageFeedCursor | null,
  direction: ImageFeedDirection,
  limit: number,
): Promise<ImageChunk<ImageThumb>> {
  const { images, hasMore } = await getImageChunk(cursor, direction, limit);
  return { images: await Promise.all(images.map(withBlurDataURL)), hasMore };
}

/**
 * The feed starting at the first image of `year`, with some images of the newer year before it.
 *
 * @param year UTC year to start at
 * @param before images to load before the year starts
 * @param after images to load from the year start on
 */
export async function getThumbWindow(
  year: number,
  before: number,
  after: number,
): Promise<ImageThumbWindow> {
  // between `year` and the year after it; id 0 puts an image exactly on the boundary in the newer
  const cursor = { createdAt: new Date(Date.UTC(year + 1, 0, 1)).toISOString(), id: 0 };
  const [newer, older] = await Promise.all([
    getThumbChunk(cursor, 'newer', before),
    getThumbChunk(cursor, 'older', after),
  ]);

  return {
    images: [...newer.images, ...older.images],
    hasNewer: newer.hasMore,
    hasOlder: older.hasMore,
  };
}
