'use server';
import { getThumbChunk, getThumbWindow } from '@/lib/data/image/thumbs';
import type { ImageChunk, ImageThumb, ImageThumbWindow } from '@/lib/data/image/types';
import {
  ImageFeedCursorSchema,
  ImageFeedDirectionSchema,
  ImageFeedYearSchema,
} from '@/lib/validators/image-feed';
import { FEED_CHUNK, JUMP_AFTER, JUMP_BEFORE } from './constants';

export async function loadThumbChunk(
  cursor: unknown,
  direction: unknown,
): Promise<ImageChunk<ImageThumb>> {
  return getThumbChunk(
    ImageFeedCursorSchema.parse(cursor),
    ImageFeedDirectionSchema.parse(direction),
    FEED_CHUNK,
  );
}

export async function loadByYear(year: unknown): Promise<ImageThumbWindow> {
  return getThumbWindow(ImageFeedYearSchema.parse(year), JUMP_BEFORE, JUMP_AFTER);
}
