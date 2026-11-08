'use server';
import { getNewerYearLayout, getYearWindow } from '@/lib/data/image/layout';
import { getThumbChunk, getThumbsByIds } from '@/lib/data/image/thumbs';
import type { ImageChunk, ImageLayout, ImageSlotWindow, ImageThumb } from '@/lib/data/image/types';
import {
  ImageFeedCursorSchema,
  ImageFeedIdsSchema,
  ImageFeedYearSchema,
} from '@/lib/validators/image-feed';
import { FEED_CHUNK, JUMP_AFTER, JUMP_BEFORE } from './constants';

export async function loadOlderThumbs(cursor: unknown): Promise<ImageChunk<ImageThumb>> {
  return getThumbChunk(ImageFeedCursorSchema.parse(cursor), 'older', FEED_CHUNK);
}

export async function loadNewerYear(cursor: unknown): Promise<ImageChunk<ImageLayout>> {
  return getNewerYearLayout(ImageFeedCursorSchema.parse(cursor));
}

export async function loadThumbsByIds(ids: unknown): Promise<ImageThumb[]> {
  return getThumbsByIds(ImageFeedIdsSchema.parse(ids));
}

export async function loadByYear(year: unknown): Promise<ImageSlotWindow> {
  return getYearWindow(ImageFeedYearSchema.parse(year), JUMP_BEFORE, JUMP_AFTER);
}
