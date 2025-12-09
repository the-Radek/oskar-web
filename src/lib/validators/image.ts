import z from 'zod';
import { dateSchema } from './date';

export const ImageSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
  width: z.number().min(1),
  height: z.number().min(1),
  published: z.boolean().default(true),
  createdAt: dateSchema.default(new Date()),
});
