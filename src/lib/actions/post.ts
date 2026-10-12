import { cache } from 'react';
import { prisma } from '../prisma';
import z from 'zod';
import { PostSchema } from '../validators/post';
import { ImageSchema } from '../validators/image';
import { excerpt } from '../utilities/excerpt';
import { getBlurDataURL } from '../utilities/blur-data-url';

const CreatePostInputSchema = z.object({
  post: PostSchema,
  images: z.array(ImageSchema),
});

export type CreatePostInput = z.infer<typeof CreatePostInputSchema>;

const EXCERPT_LENGTH = 300;

async function withBlur<T extends { src: string }>(image: T) {
  return { ...image, blurDataURL: await getBlurDataURL(image.src, { immutable: true }) };
}

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
  const post = await prisma.post.findFirst({
    where: { id, published: true, deletedAt: null },
    include: { image: true, images: true },
  });
  if (!post) return null;

  const [image, images] = await Promise.all([
    post.image && withBlur(post.image),
    Promise.all(post.images.map(withBlur)),
  ]);

  return { ...post, image, images };
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

  const posts = await Promise.all(
    rows.map(async ({ content, createdAt, image, ...post }) => ({
      ...post,
      image: image && (await withBlur(image)),
      createdAt: createdAt.toISOString(),
      excerpt: excerpt(content, EXCERPT_LENGTH),
    })),
  );

  return { posts, total };
}

export type PostThumb = Awaited<ReturnType<typeof getPostThumbs>>['posts'][number];
