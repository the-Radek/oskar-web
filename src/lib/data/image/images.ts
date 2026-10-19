import { prisma } from '../../prisma';
import type { ImageFeedCursor, ImageFeedDirection } from '../../validators/image-feed';
import { serialize, visible } from '../shared';
import { imageSelect, inPost } from './image';
import type { ImageChunk, ImageInfo } from './types';

/**
 * Rows strictly past `cursor` in the given direction of the gallery order (newest first, ties
 * broken by id), or all rows when there is no cursor.
 */
function pastCursor(cursor: ImageFeedCursor | null, direction: ImageFeedDirection) {
  if (!cursor) return {};
  const createdAt = new Date(cursor.createdAt);
  const op = direction === 'older' ? 'lt' : 'gt';
  return { OR: [{ createdAt: { [op]: createdAt } }, { createdAt, id: { [op]: cursor.id } }] };
}

/**
 * Images next to `cursor` in the gallery order, across years.
 *
 * @param cursor image to start from (not included), or null for the very start
 * @param direction `older` continues down the feed, `newer` goes back up
 * @param limit chunk size
 * @param postId only walk the images of this post
 * @returns images in gallery order (newest first)
 */
export async function getImageChunk(
  cursor: ImageFeedCursor | null,
  direction: ImageFeedDirection,
  limit: number,
  postId?: number,
): Promise<ImageChunk> {
  const order = direction === 'older' ? 'desc' : 'asc';
  const rows = await prisma.image.findMany({
    where: { ...visible, ...inPost(postId), ...pastCursor(cursor, direction) },
    orderBy: [{ createdAt: order }, { id: order }],
    select: imageSelect,
    take: limit + 1, // the extra row only tells whether there is more
  });
  const images = rows.slice(0, limit).map(serialize);
  // 'newer' is read nearest-first, flip it back to gallery order
  return {
    images: direction === 'newer' ? images.reverse() : images,
    hasMore: rows.length > limit,
  };
}

/**
 * An image with some of its neighbours on both sides, for the lightbox to start from.
 *
 * @param image the image to open
 * @param count neighbours to load per side
 * @param postId only walk the images of this post
 * @returns images in gallery order (newest first), the index of `image` among them and whether
 *   there is more on either side
 */
export async function getImageWindow(image: ImageInfo, count: number, postId?: number) {
  const cursor = { createdAt: image.createdAt, id: image.id };
  const [newer, older] = await Promise.all([
    getImageChunk(cursor, 'newer', count, postId),
    getImageChunk(cursor, 'older', count, postId),
  ]);

  return {
    images: [...newer.images, image, ...older.images],
    index: newer.images.length,
    hasNewer: newer.hasMore,
    hasOlder: older.hasMore,
  };
}
