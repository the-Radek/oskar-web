import z from 'zod';
import { IdSchema } from './id';

export const ImageFeedCursorSchema = z.object({
  createdAt: z.iso.datetime(),
  id: IdSchema,
});

export const ImageFeedDirectionSchema = z.enum(['newer', 'older']);

export const ImageFeedPostIdSchema = IdSchema.optional();

export const ImageFeedYearSchema = z.number().int().min(1900).max(2100);

export const MAX_FEED_IMAGE_IDS = 100;

export const ImageFeedIdsSchema = z.array(IdSchema).min(1).max(MAX_FEED_IMAGE_IDS);

export type ImageFeedCursor = z.infer<typeof ImageFeedCursorSchema>;
export type ImageFeedDirection = z.infer<typeof ImageFeedDirectionSchema>;
