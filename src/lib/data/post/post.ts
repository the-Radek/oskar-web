import { cache } from 'react';
import { prisma } from '../../prisma';
import { withBlurDataURL } from '../../utilities/blur-data-url';
import { CreatePostSchema } from '../../validators/post';
import { visible } from '../shared';

/**
 * A published post with its cover image and gallery (newest first), both with blur
 * placeholders, or null when it doesn't exist or isn't published.
 */
export const getPost = cache(async (id: number) => {
  const post = await prisma.post.findFirst({
    where: { ...visible, id },
    include: {
      image: true,
      images: { where: visible, orderBy: [{ createdAt: 'desc' }, { id: 'desc' }] },
    },
  });
  if (!post) return null;

  const [image, images] = await Promise.all([
    post.image && withBlurDataURL(post.image),
    Promise.all(post.images.map(withBlurDataURL)),
  ]);

  return { ...post, image, images };
});

/**
 * Creates a post with its gallery images, authored by `userId`.
 *
 * @param input untrusted, parsed with `CreatePostSchema`
 */
export async function createPost(userId: string, input: unknown) {
  const { post, images } = CreatePostSchema.parse(input);

  await prisma.post.create({
    data: {
      ...post,
      authorId: userId,
      images: { create: images.map((image) => ({ ...image, authorId: userId })) },
    },
  });
}
