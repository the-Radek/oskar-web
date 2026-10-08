import PostsEmpty from './empty';
import { notFound } from 'next/navigation';
import { PostsTotal } from './total';
import { getPostThumbs } from '@/lib/actions/post';
import PostListing from '@/components/content/PostListing';

interface PostsResultsProps {
  page: number;
  pageSize: number;
}

export default async function PostsResults({ page, pageSize }: PostsResultsProps) {
  const { posts, total } = await getPostThumbs(page, pageSize);

  if (total === 0)
    return (
      <>
        <PostsEmpty />
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
