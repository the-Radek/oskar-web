import type { getPublishedPosts } from '@/lib/actions/post';

export interface PostRowProps {
  post: Awaited<ReturnType<typeof getPublishedPosts>>['posts'][number];
}
