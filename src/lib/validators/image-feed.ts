import z from 'zod';
import { IdSchema } from './id';

export const ImageFeedCursorSchema = z.object({
  createdAt: z.iso.datetime(),
  id: IdSchema,
});

export const ImageFeedDirectionSchema = z.enum(['newer', 'older']);

export const ImageFeedPostIdSchema = IdSchema.optional();

export type ImageFeedCursor = z.infer<typeof ImageFeedCursorSchema>;
export type ImageFeedDirection = z.infer<typeof ImageFeedDirectionSchema>;
