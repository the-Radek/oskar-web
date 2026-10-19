import { cache } from 'react';
import { prisma } from '../../prisma';
import { serialize, visible } from '../shared';
import type { ImageInfo } from './types';

export const imageSelect = {
  id: true,
  src: true,
  alt: true,
  width: true,
  height: true,
  createdAt: true,
};

/**
 * A published image, or null when it doesn't exist or isn't published.
 */
export const getImage = cache(async (id: number): Promise<ImageInfo | null> => {
  const image = await prisma.image.findFirst({
    where: { ...visible, id },
    select: imageSelect,
  });
  return image && serialize(image);
});

/**
 * Only images of a published post, or all images when there's no post.
 */
export function inPost(postId?: number) {
  return postId ? { posts: { some: { id: postId, ...visible } } } : {};
}

/**
 * Whether a published image belongs to a published post.
 */
export async function isImageInPost(id: number, postId: number) {
  return (await prisma.image.count({ where: { ...visible, ...inPost(postId), id } })) > 0;
}
