import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { PostRowSkeleton } from '@/components/content/PostRow';
import styles from './page.module.css';
import { DEFAULT_PAGE_SIZE, PAGE_SIZES } from './constants';

export default function PostsLoading() {
  return (
    <main>
      <Typography variant="h1">Články</Typography>
      <div className={styles.list}>
        {Array.from({ length: DEFAULT_PAGE_SIZE }, (_, index) => (
          <PostRowSkeleton key={index} />
        ))}
      </div>
      <div className={styles.footer}>
        <Pagination
          shape="rounded"
          color="primary"
          page={1}
          count={10}
          className={styles.pagination}
          disabled
        />
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
