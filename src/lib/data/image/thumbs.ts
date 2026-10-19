import { withBlurDataURL } from '../../utilities/blur-data-url';
import type { ImageFeedCursor } from '../../validators/image-feed';
import { getImageChunk } from './images';
import type { ImageChunk, ImageThumb } from './types';

/**
 * The next chunk of the gallery feed with blur placeholders, newest first.
 *
 * @param cursor last image already loaded, or null for the first chunk
 * @param limit chunk size
 */
export async function getThumbChunk(
  cursor: ImageFeedCursor | null,
  limit: number,
): Promise<ImageChunk<ImageThumb>> {
  const { images, hasMore } = await getImageChunk(cursor, 'older', limit);
  return { images: await Promise.all(images.map(withBlurDataURL)), hasMore };
}
