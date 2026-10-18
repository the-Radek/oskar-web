'use server';
import { getThumbChunk } from '@/lib/data/image/thumbs';
import type { ImageChunk, ImageThumb } from '@/lib/data/image/types';
import { ImageFeedCursorSchema } from '@/lib/validators/image-feed';
import { FEED_CHUNK } from './constants';

export async function loadThumbChunk(cursor: unknown): Promise<ImageChunk<ImageThumb>> {
  return getThumbChunk(ImageFeedCursorSchema.parse(cursor), FEED_CHUNK);
}
