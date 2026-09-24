import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import styles from './page.module.css';
import Pagination from '@mui/material/Pagination';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Link from 'next/link';

const PAGE_SIZES = [5, 10, 20, 50];
const DEFAULT_PAGE_SIZE = 5;

export default function PostsLoading() {
  return (
    <main>
      <Typography variant="h1">Články</Typography>
      <div className={styles.list}>
        {Array.from({ length: DEFAULT_PAGE_SIZE }, (_, index) => (
          <div key={index} className={styles.skeletonRow}>
            <Skeleton variant="rounded" className={styles.skeletonImage} />
            <div className={styles.skeletonContent}>
              <Skeleton variant="text" width="40%" height={40} />
              <Skeleton variant="text" width="90%" />
              <Skeleton variant="text" width="90%" />
              <Skeleton variant="text" width="60%" />
            </div>
          </div>
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
