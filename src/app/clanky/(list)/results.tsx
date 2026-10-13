import { notFound } from 'next/navigation';
import { PostsTotal } from './total';
import { getPostThumbs } from '@/lib/actions/post';
import PostListing from '@/components/content/PostListing';
import Surface from '@/components/layout/Surface';
import StuckActions from '@/components/layout/StuckActions';

interface PostsResultsProps {
  page: number;
  pageSize: number;
}

export default async function PostsResults({ page, pageSize }: PostsResultsProps) {
  const { posts, total } = await getPostThumbs(page, pageSize);

  if (total === 0)
    return (
      <>
        <Surface variant="container">
          <p>Zatím tu nejsou žádné články.</p>
        </Surface>
        <StuckActions />
        <PostsTotal total={total} />
      </>
    );
  if (posts.length === 0) return notFound();

  return (
    <>
      <PostListing posts={posts} />
      <PostsTotal total={total} />
    </>
  );
}
