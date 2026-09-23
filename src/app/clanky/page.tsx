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

export const metadata: Metadata = metadataJson;

const PAGE_SIZES = [5, 10, 20, 50];
const DEFAULT_PAGE_SIZE = 5;

export default async function Posts({ searchParams }: PageProps<'/clanky'>) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const pageSize = Number(params.pageSize) || DEFAULT_PAGE_SIZE;

  const { posts, total } = await getPublishedPosts(page, pageSize);
  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  if (posts.length === 0) {
    return (
      <main>
        <Typography variant="h1">Články</Typography>
        <p>Zatím tu nejsou žádné články.</p>
      </main>
    );
  }

  return (
    <main>
      <Typography variant="h1">Články</Typography>
      <div className={styles.list}>
        {posts.map((post) => (
          <PostRow key={post.id} post={post} />
        ))}
      </div>
      <div className={styles.footer}>
        <PaginationNav
          href="/clanky"
          page={page}
          count={pageCount}
          pageSize={pageSize}
          className={styles.pagination}
        />
        <ButtonGroup size="small" className={styles.pageSize}>
          {PAGE_SIZES.map((size) => (
            <Button
              key={size}
              component={Link}
              href={`/clanky?page=1&pageSize=${size}`}
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
