import GoogleButton from '@/components/auth/GoogleButton';
import ApplicationButton from '@/components/common/ApplicationButton';
import PostListing from '@/components/content/PostListing';
import { getPublishedPosts } from '@/lib/actions/post';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const { posts } = await getPublishedPosts(1, 3);

  return (
    <main>
      <ApplicationButton />
      <section>
        <Typography variant="h1" component="h1">
          Aktuality
        </Typography>
        <PostListing posts={posts} className={styles.listing} />
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
