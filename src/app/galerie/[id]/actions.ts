'use server';
import { getImageChunk } from '@/lib/data/image/images';
import type { ImageChunk, ImageInfo } from '@/lib/data/image/types';
import {
  ImageFeedCursorSchema,
  ImageFeedDirectionSchema,
  ImageFeedPostIdSchema,
} from '@/lib/validators/image-feed';
import { LIGHTBOX_CHUNK } from '../constants';

export async function loadImageChunk(
  cursor: unknown,
  direction: unknown,
  postId?: unknown,
): Promise<ImageChunk<ImageInfo>> {
  return getImageChunk(
    ImageFeedCursorSchema.parse(cursor),
    ImageFeedDirectionSchema.parse(direction),
    LIGHTBOX_CHUNK,
    ImageFeedPostIdSchema.parse(postId),
  );
}
