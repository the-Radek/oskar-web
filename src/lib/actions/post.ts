import { prisma } from '../prisma';
import z from 'zod';
import { PostSchema } from '../validators/post';
import { ImageSchema } from '../validators/image';

const CreatePostInputSchema = z.object({
  post: PostSchema,
  images: z.array(ImageSchema),
});

export type CreatePostInput = z.infer<typeof CreatePostInputSchema>;

export async function createPost(userId: string, input: CreatePostInput) {
  const result = CreatePostInputSchema.parse(input);

  await prisma.post.create({
    data: {
      ...result.post,
      authorId: userId,
      images: {
        create: result.images.map((image) => ({ ...image, authorId: userId })),
      },
    },
  });
}
