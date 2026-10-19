import z from 'zod';
import { IdSchema } from './id';

export const ImageFeedCursorSchema = z.object({
  createdAt: z.iso.datetime(),
  id: IdSchema,
});

export const ImageFeedDirectionSchema = z.enum(['newer', 'older']);

export const ImageFeedPostIdSchema = IdSchema.optional();

export const ImageFeedYearSchema = z.number().int().min(1900).max(2100);

export type ImageFeedCursor = z.infer<typeof ImageFeedCursorSchema>;
export type ImageFeedDirection = z.infer<typeof ImageFeedDirectionSchema>;
