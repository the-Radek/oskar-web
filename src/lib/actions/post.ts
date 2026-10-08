import { cache } from 'react';
import { prisma } from '../prisma';
import z from 'zod';
import { PostSchema } from '../validators/post';
import { ImageSchema } from '../validators/image';
import { excerpt } from '../utilities/excerpt';

const CreatePostInputSchema = z.object({
  post: PostSchema,
  images: z.array(ImageSchema),
});

export type CreatePostInput = z.infer<typeof CreatePostInputSchema>;

const EXCERPT_LENGTH = 300;

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

export const getPost = cache(async (id: number) => {
  return prisma.post.findFirst({
    where: { id, published: true, deletedAt: null },
    include: { image: true, images: true },
  });
});

export async function getPostThumbs(page = 1, pageSize = 10) {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  const where = { published: true, deletedAt: null };

  const [rows, total] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        image: { select: { src: true, alt: true } },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.post.count({ where }),
  ]);

  const posts = rows.map(({ content, createdAt, ...post }) => ({
    ...post,
    createdAt: createdAt.toISOString(),
    excerpt: excerpt(content, EXCERPT_LENGTH),
  }));

  return { posts, total };
}

export type PostThumb = Awaited<ReturnType<typeof getPostThumbs>>['posts'][number];
