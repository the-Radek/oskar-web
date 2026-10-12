import { Suspense } from 'react';
import { Metadata } from 'next';
import metadataJson from './metadata.json';
import { PostListingSkeleton } from '@/components/content/PostListing';
import PostsView, { DEFAULT_PAGE_SIZE, PAGE_SIZES } from './view';
import PostsResults from './results';

export const metadata: Metadata = metadataJson;

export default async function PostsPage({ searchParams }: PageProps<'/clanky'>) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const pageSize = Math.min(Number(params.pageSize) || DEFAULT_PAGE_SIZE, Math.max(...PAGE_SIZES));

  return (
    <PostsView page={page} pageSize={pageSize}>
      <Suspense key={`${page}:${pageSize}`} fallback={<PostListingSkeleton count={pageSize} />}>
        <PostsResults page={page} pageSize={pageSize} />
      </Suspense>
    </PostsView>
  );
}
