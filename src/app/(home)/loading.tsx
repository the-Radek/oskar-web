import GoogleButton from '@/components/auth/GoogleButton';
import ApplicationButton from '@/components/common/ApplicationButton';
import { PostListingSkeleton } from '@/components/content/PostListing';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import styles from './page.module.css';

export default function HomeLoading() {
  return (
    <main>
      <ApplicationButton />
      <section>
        <Typography variant="h1" component="h1">
          Aktuality
        </Typography>
        <PostListingSkeleton count={3} className={styles.listing} />
        <Button
          component={Link}
          href="/clanky"
          variant="outlined"
          fullWidth
          className={styles.showMore}
        >
          Všechny články
        </Button>
      </section>
      <GoogleButton />
    </main>
  );
}
