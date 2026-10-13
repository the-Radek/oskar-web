'use server';
import { getImageThumbs, type ImageChunk, type ImageThumb } from '@/lib/actions/image';
import { ImageFeedCursorSchema } from '@/lib/validators/image-feed';
import { FEED_CHUNK } from './constants';

export async function loadFeedChunk(cursor: unknown): Promise<ImageChunk<ImageThumb>> {
  return getImageThumbs(ImageFeedCursorSchema.parse(cursor), FEED_CHUNK);
}
