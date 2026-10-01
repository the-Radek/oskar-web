import type { getPublishedPosts } from '@/lib/actions/post';

export interface PostListingProps {
  posts: Awaited<ReturnType<typeof getPublishedPosts>>['posts'];
}
