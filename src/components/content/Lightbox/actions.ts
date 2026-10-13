'use server';
import { getImageNeighbours, type ImageSummary, type ImageChunk } from '@/lib/actions/image';
import { ImageFeedCursorSchema, ImageFeedDirectionSchema } from '@/lib/validators/image-feed';
import { LIGHTBOX_CHUNK } from '@/app/galerie/constants';

export async function loadGalleryNeighbours(
  cursor: unknown,
  direction: unknown,
): Promise<ImageChunk<ImageSummary>> {
  return getImageNeighbours(
    ImageFeedCursorSchema.parse(cursor),
    ImageFeedDirectionSchema.parse(direction),
    LIGHTBOX_CHUNK,
  );
}
