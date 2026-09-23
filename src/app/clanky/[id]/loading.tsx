import Skeleton from '@mui/material/Skeleton';
import Surface from '@/components/content/Surface';
import styles from './page.module.css';

export default function PostDetailLoading() {
  return (
    <main>
      <Skeleton variant="rounded" width={160} height={36} className={styles['go-back']} />
      <Surface component="article" variant="container">
        <Skeleton variant="rounded" height={300} className={styles.image} />
        <Skeleton variant="text" width="60%" height={48} />
        <Skeleton variant="text" width="30%" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" width="80%" />
      </Surface>
    </main>
  );
}
