import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import clsx from 'clsx';
import Surface from '@/components/layout/Surface';
import styles from './page.module.css';

const PARAGRAPH_LINES = [6, 7];
const GALLERY_ITEMS = 10;

export default function PostDetailLoading() {
  return (
    <main>
      <Surface component="article" variant="container" className={styles.article}>
        <Typography variant="h1">
          <Skeleton width="50%" className={styles.skeletonLine} />
        </Typography>
        <Typography variant="body2" gutterBottom>
          <Skeleton width="30%" className={styles.skeletonLine} />
        </Typography>
        <Skeleton variant="rounded" className={clsx(styles.image, styles.skeletonImage)} />
        {PARAGRAPH_LINES.map((lines, index) => (
          <Typography key={index} align="justify" gutterBottom>
            {Array.from({ length: lines }, (_, line) => (
              <Skeleton
                key={line}
                width={line === lines - 1 ? '40%' : undefined}
                className={styles.skeletonLine}
              />
            ))}
          </Typography>
        ))}
      </Surface>
      <div className={styles.gallery}>
        {Array.from({ length: GALLERY_ITEMS }, (_, index) => (
          <Skeleton key={index} variant="rectangular" />
        ))}
      </div>
    </main>
  );
}
