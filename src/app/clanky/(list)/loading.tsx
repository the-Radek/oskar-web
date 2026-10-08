import { PostListingSkeleton } from '@/components/content/PostListing';
import PostsView, { DEFAULT_PAGE_SIZE } from './view';

export default function PostsLoading() {
  return (
    <PostsView page={1} pageSize={DEFAULT_PAGE_SIZE}>
      <PostListingSkeleton count={DEFAULT_PAGE_SIZE} />
    </PostsView>
  );
}
