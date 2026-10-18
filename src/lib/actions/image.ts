import { cache } from 'react';
import { prisma } from '../prisma';
import { getBlurDataURL } from '../utilities/blur-data-url';
import type { ImageFeedCursor, ImageFeedDirection } from '../validators/image-feed';

const where = { published: true, deletedAt: null };
const select = { id: true, src: true, alt: true, width: true, height: true, createdAt: true };

/**
 * A published image as sent to the browser.
 */
export interface ImageSummary {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
  /** ISO date string */
  createdAt: string;
}

/**
 * A gallery image with a blur placeholder, for the mosaic.
 */
export interface ImageThumb extends ImageSummary {
  blurDataURL?: string;
}

export interface ImageChunk<T extends ImageSummary = ImageSummary> {
  images: T[];
  hasMore: boolean;
}

function serialize({ createdAt, ...image }: Omit<ImageSummary, 'createdAt'> & { createdAt: Date }) {
  return { ...image, createdAt: createdAt.toISOString() };
}

/**
 * Rows strictly after `cursor` in the given direction of the gallery order (newest first, ties
 * broken by id), or all rows when there is no cursor.
 */
function after(cursor: ImageFeedCursor | null, direction: ImageFeedDirection) {
  if (!cursor) return {};
  const createdAt = new Date(cursor.createdAt);
  const op = direction === 'older' ? 'lt' : 'gt';
  return { OR: [{ createdAt: { [op]: createdAt } }, { createdAt, id: { [op]: cursor.id } }] };
}

/**
 * Restricts images to those attached to a published post, or nothing when there's no post.
 */
function inPost(postId?: number) {
  if (!postId) return {};
  return { posts: { some: { id: postId, published: true, deletedAt: null } } };
}

async function getChunk(
  cursor: ImageFeedCursor | null,
  direction: ImageFeedDirection,
  limit: number,
  postId?: number,
) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const order = direction === 'older' ? 'desc' : 'asc';
  const rows = await prisma.image.findMany({
    where: { ...where, ...inPost(postId), ...after(cursor, direction) },
    orderBy: [{ createdAt: order }, { id: order }],
    select,
    take: limit + 1,
  });
  const images = rows.slice(0, limit).map(serialize);
  // nearest-first for 'newer'; callers get gallery order (newest first)
  return {
    images: direction === 'newer' ? images.reverse() : images,
    hasMore: rows.length > limit,
  };
}

/**
 * The next chunk of the gallery feed, newest first.
 *
 * @param cursor last image already loaded, or null for the first chunk
 * @param limit chunk size
 */
export async function getImageThumbs(
  cursor: ImageFeedCursor | null,
  limit: number,
): Promise<ImageChunk<ImageThumb>> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const { images, hasMore } = await getChunk(cursor, 'older', limit);
  const thumbs = await Promise.all(
    images.map(async (image) => ({
      ...image,
      blurDataURL: await getBlurDataURL(image.src, { immutable: true }),
    })),
  );
  return { images: thumbs, hasMore };
}

/**
 * Images next to `cursor` in the gallery order, across years.
 *
 * @param cursor image to start from (not included)
 * @param direction `older` continues down the feed, `newer` goes back up
 * @param limit chunk size
 * @param postId only walk the images of this post
 * @returns images in gallery order (newest first)
 */
export function getImageNeighbours(
  cursor: ImageFeedCursor,
  direction: ImageFeedDirection,
  limit: number,
  postId?: number,
) {
  return getChunk(cursor, direction, limit, postId);
}

/**
 * Whether a published image belongs to a published post.
 */
export async function isImageInPost(id: number, postId: number) {
  return (await prisma.image.count({ where: { ...where, ...inPost(postId), id } })) > 0;
}

/**
 * A published image, or null when it doesn't exist or isn't published.
 */
export const getImage = cache(async (id: number) => {
  const image = await prisma.image.findFirst({ where: { ...where, id }, select });
  return image && serialize(image);
});

/**
 * An image with some of its neighbours on both sides, for the lightbox to start from.
 *
 * @param image the image to open
 * @param count neighbours to load per side
 * @param postId only walk the images of this post
 * @returns images in gallery order (newest first) and the index of `image` among them
 */
export async function getImageWindow(image: ImageSummary, count: number, postId?: number) {
  const cursor = { createdAt: image.createdAt, id: image.id };
  const [newer, older] = await Promise.all([
    getImageNeighbours(cursor, 'newer', count, postId),
    getImageNeighbours(cursor, 'older', count, postId),
  ]);

  return {
    images: [...newer.images, image, ...older.images],
    index: newer.images.length,
    hasNewer: newer.hasMore,
    hasOlder: older.hasMore,
  };
}
