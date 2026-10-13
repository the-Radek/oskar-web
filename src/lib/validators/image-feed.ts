import z from 'zod';

export const ImageFeedCursorSchema = z.object({
  createdAt: z.iso.datetime(),
  id: z.number().int().positive(),
});

export const ImageFeedDirectionSchema = z.enum(['newer', 'older']);

export type ImageFeedCursor = z.infer<typeof ImageFeedCursorSchema>;
export type ImageFeedDirection = z.infer<typeof ImageFeedDirectionSchema>;
