import { PostListingSkeleton } from '@/components/content/PostListing';
import PostsShell, { DEFAULT_PAGE_SIZE } from './shell';

export default function PostsLoading() {
  return (
    <PostsShell page={1} pageSize={DEFAULT_PAGE_SIZE}>
      <PostListingSkeleton count={DEFAULT_PAGE_SIZE} />
    </PostsShell>
  );
}
