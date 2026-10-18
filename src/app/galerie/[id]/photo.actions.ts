'use server';
import { getImageNeighbours, type ImageSummary, type ImageChunk } from '@/lib/actions/image';
import {
  ImageFeedCursorSchema,
  ImageFeedDirectionSchema,
  ImageFeedPostIdSchema,
} from '@/lib/validators/image-feed';
import { LIGHTBOX_CHUNK } from '../constants';

export async function loadGalleryNeighbours(
  cursor: unknown,
  direction: unknown,
  postId?: unknown,
): Promise<ImageChunk<ImageSummary>> {
  return getImageNeighbours(
    ImageFeedCursorSchema.parse(cursor),
    ImageFeedDirectionSchema.parse(direction),
    LIGHTBOX_CHUNK,
    ImageFeedPostIdSchema.parse(postId),
  );
}
