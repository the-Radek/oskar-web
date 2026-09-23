import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import styles from './page.module.css';

export default function PostsLoading() {
  return (
    <main>
      <Typography variant="h1">Články</Typography>
      <div className={styles.grid}>
        {Array.from({ length: 6 }, (_, index) => (
          <Skeleton key={index} variant="rounded" height={320} />
        ))}
      </div>
    </main>
  );
}
