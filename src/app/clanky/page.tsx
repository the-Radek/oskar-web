import { Metadata } from 'next';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import metadataJson from './metadata.json';
import styles from './page.module.css';
import { getPublishedPosts } from '@/lib/actions/post';
import PostRow from '@/components/content/PostRow';
import PaginationNav from '@/components/navigation/PaginationNav';
import Link from 'next/link';
import PostsEmptyPage from './empty';
import { DEFAULT_PAGE_SIZE, PAGE_SIZES } from './constants';

export const metadata: Metadata = metadataJson;

export default async function PostsPage({ searchParams }: PageProps<'/clanky'>) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const pageSize = Number(params.pageSize) || DEFAULT_PAGE_SIZE;

  const { posts, total } = await getPublishedPosts(page, pageSize);
  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  if (posts.length === 0) return <PostsEmptyPage />;

  return (
    <main>
      <Typography variant="h1">Články</Typography>
      <div className={styles.list}>
        {posts.map((post) => (
          <PostRow key={post.id} post={post} />
        ))}
      </div>
      <div className={styles.footer}>
        <PaginationNav page={page} count={pageCount} className={styles.pagination} />
        <ButtonGroup size="small" className={styles.pageSize}>
          {PAGE_SIZES.map((size) => (
            <Button
              key={size}
              component={Link}
              href={`/clanky?pageSize=${size}`}
              variant={size === pageSize ? 'contained' : 'outlined'}
            >
              {size}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </main>
  );
}
