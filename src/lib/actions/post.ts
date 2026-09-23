import { cache } from 'react';
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

export async function getPublishedPosts() {
  return prisma.post.findMany({
    where: { published: true, deletedAt: null },
    orderBy: { createdAt: 'desc' },
    include: { image: true },
  });
}

// cache() dedupes calls within one request: generateMetadata and the page component both need this.
export const getPublishedPost = cache(async (id: number) => {
  return prisma.post.findFirst({
    where: { id, published: true, deletedAt: null },
    include: { image: true, images: true },
  });
});
