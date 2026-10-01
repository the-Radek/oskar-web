import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { PostListingSkeleton } from '@/components/content/PostListing';
import styles from './page.module.css';
import { DEFAULT_PAGE_SIZE, PAGE_SIZES } from './constants';

export default function PostsLoading() {
  const pagination = (
    <Pagination
      shape="rounded"
      color="primary"
      page={1}
      count={10}
      className={styles.pagination}
      disabled
    />
  );

  return (
    <main>
      <div className={styles.header}>
        <Typography variant="h1">Články</Typography>
        {pagination}
      </div>
      <PostListingSkeleton count={DEFAULT_PAGE_SIZE} />
      <div className={styles.footer}>
        {pagination}
        <ButtonGroup size="small" className={styles.pageSize}>
          {PAGE_SIZES.map((size) => (
            <Button
              key={size}
              component={Link}
              href={`/clanky?pageSize=${size}`}
              variant={size === DEFAULT_PAGE_SIZE ? 'contained' : 'outlined'}
            >
              {size}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </main>
  );
}
