import { withBlurDataURL } from '../../utilities/blur-data-url';
import type { ImageFeedCursor, ImageFeedDirection } from '../../validators/image-feed';
import { getImageChunk, getImagesByIds } from './images';
import type { ImageChunk, ImageThumb } from './types';

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
 * The published images among `ids` with blur placeholders, in no particular order.
 */
export async function getThumbsByIds(ids: number[]): Promise<ImageThumb[]> {
  return Promise.all((await getImagesByIds(ids)).map(withBlurDataURL));
}
