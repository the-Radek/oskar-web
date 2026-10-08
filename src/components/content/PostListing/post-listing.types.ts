import type { PostThumb } from '@/lib/actions/post';

export interface PostListingProps {
  posts: PostThumb[];
  className?: string;
}
