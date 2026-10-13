import { notFound } from 'next/navigation';
import { PostsTotal } from './total';
import { getPostThumbs } from '@/lib/actions/post';
import PostListing from '@/components/content/PostListing';
import Surface from '@/components/layout/Surface';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';
import styles from '@/app/error.module.css';

interface PostsResultsProps {
  page: number;
  pageSize: number;
}

export default async function PostsResults({ page, pageSize }: PostsResultsProps) {
  const { posts, total } = await getPostThumbs(page, pageSize);

  if (total === 0)
    return (
      <>
        <Surface variant="container">
          <p>Zatím tu nejsou žádné články.</p>
        </Surface>
        <div className={styles.actions}>
          <Button variant="outlined" component={Link} href="/" startIcon={<HomeIcon />}>
            Jít domů
          </Button>
        </div>
        <PostsTotal total={total} />
      </>
    );
  if (posts.length === 0) return notFound();

  return (
    <>
      <PostListing posts={posts} />
      <PostsTotal total={total} />
    </>
  );
}
