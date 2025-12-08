import z from 'zod';

export const PostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  published: z.boolean().default(true),
  createdAt: z.date().default(new Date()),
});
