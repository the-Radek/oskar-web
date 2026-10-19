import type { PostSummary } from '@/lib/data/post/types';

export interface PostListingProps {
  posts: PostSummary[];
  className?: string;
}
