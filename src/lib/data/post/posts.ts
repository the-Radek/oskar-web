import { prisma } from '../../prisma';
import { withBlurDataURL } from '../../utilities/blur-data-url';
import { excerpt } from '../../utilities/excerpt';
import { serialize, visible } from '../shared';
import type { PostSummary } from './types';

const EXCERPT_LENGTH = 300;

const summarySelect = {
  id: true,
  title: true,
  content: true,
  createdAt: true,
  image: { select: { src: true, alt: true } },
};

/**
 * One page of published posts, newest first.
 *
 * @param page 1-based page number
 * @param pageSize posts per page
 * @returns the page's posts and the total number of published posts
 */
export async function getPostSummaries(
  page = 1,
  pageSize = 10,
): Promise<{ posts: PostSummary[]; total: number }> {
  const [rows, total] = await Promise.all([
    prisma.post.findMany({
      where: visible,
      orderBy: { createdAt: 'desc' },
      select: summarySelect,
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.post.count({ where: visible }),
  ]);

  const posts = await Promise.all(
    rows.map(async ({ content, image, ...post }) => ({
      ...serialize(post),
      excerpt: excerpt(content, EXCERPT_LENGTH),
      image: image && (await withBlurDataURL(image)),
    })),
  );

  return { posts, total };
}
