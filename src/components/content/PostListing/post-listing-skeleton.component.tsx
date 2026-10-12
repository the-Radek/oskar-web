import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import styles from './post-listing.module.css';

export function PostListingSkeleton({ count, className }: { count: number; className?: string }) {
  return (
    <div className={clsx(styles.root, className)} role="status" aria-busy="true">
      <span className={styles.visuallyHidden}>Načítání článků…</span>
      {Array.from({ length: count }, (_, index) => (
        <Card
          key={index}
          variant="outlined"
          className={clsx(styles.card, styles.skeleton)}
          aria-hidden="true"
        >
          <div className={styles.row}>
            <CardMedia className={styles.media}>
              <Skeleton variant="rectangular" width="100%" height="100%" />
            </CardMedia>
            <CardContent className={styles.content}>
              <Typography component="h2" variant="h2">
                <Skeleton width="50%" />
              </Typography>
              <Typography variant="body2" gutterBottom>
                <Skeleton width="20%" />
              </Typography>
              <Typography align="justify">
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton width="60%" />
                <Skeleton />
                <Skeleton />
                <Skeleton width="40%" />
              </Typography>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
}
