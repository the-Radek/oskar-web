import z from 'zod';
import { dateSchema } from './date';
import { ImageSchema } from './image';

export const PostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  createdAt: dateSchema.default(() => new Date()),
});

export const CreatePostSchema = z.object({
  post: PostSchema,
  images: z.array(ImageSchema),
});

export type CreatePostInput = z.infer<typeof CreatePostSchema>;
