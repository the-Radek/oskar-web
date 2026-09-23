import type { Metadata } from 'next';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { notFound } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RouterLink from '@/components/navigation/RouterLink';
import Surface from '@/components/content/Surface';
import Markdown from '@/components/content/Markdown';
import { getPublishedPost } from '@/lib/actions/post';
import { formatDate } from '@/lib/utilities/format-date';
import styles from './page.module.css';

function parseId(id: string): number {
  const parsed = Number(id);
  if (!Number.isInteger(parsed)) notFound();
  return parsed;
}

export async function generateMetadata({ params }: PageProps<'/clanky/[id]'>): Promise<Metadata> {
  const { id } = await params;
  const post = await getPublishedPost(parseId(id));
  if (!post) notFound();
  return { title: post.title };
}

export default async function PostDetail({ params }: PageProps<'/clanky/[id]'>) {
  const { id } = await params;
  const post = await getPublishedPost(parseId(id));
  if (!post) notFound();

  return (
    <main>
      <Button
        component={RouterLink}
        href="/clanky"
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        className={styles['go-back']}
      >
        Zpět na články
      </Button>
      <Surface component="article" variant="container">
        {post.image && (
          <Image
            src={post.image.src}
            alt={post.image.alt}
            width={post.image.width}
            height={post.image.height}
            sizes="(max-width: 900px) 100vw, 900px"
            // above the fold on this page, so skip the default lazy-loading
            priority
            className={styles.image}
          />
        )}
        <Typography variant="h1">{post.title}</Typography>
        <Typography variant="body2" color="primary.dark" gutterBottom>
          {formatDate(post.createdAt)}
        </Typography>
        <Markdown>{post.content}</Markdown>
        {post.images.length > 0 && (
          <div className={styles.gallery}>
            {post.images.map((image) => (
              <Image
                key={image.id}
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(max-width: 600px) 50vw, 200px"
                className={styles.thumb}
              />
            ))}
          </div>
        )}
      </Surface>
    </main>
  );
}
