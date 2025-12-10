import z from 'zod';
import { dateSchema } from './date';

export const PostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  createdAt: dateSchema.default(new Date()),
});
