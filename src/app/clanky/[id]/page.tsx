import type { Metadata } from 'next';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import { notFound } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Surface from '@/components/layout/Surface';
import Markdown from '@/components/content/Markdown';
import { getPublishedPost } from '@/lib/actions/post';
import { formatDate } from '@/lib/utilities/format-date';
import styles from './page.module.css';
import GoBackButton from '@/components/navigation/GoBackButton';

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
      <Surface component="article" variant="container" className={styles.article}>
        <GoBackButton
          from="/clanky"
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          className={styles.goBack}
        >
          Zpět na články
        </GoBackButton>
        {post.image && (
          <Image
            src={post.image.src}
            alt={post.image.alt}
            width={post.image.width}
            height={post.image.height}
            sizes="300px"
            priority
            className={styles.image}
          />
        )}
        <Typography variant="h1">{post.title}</Typography>
        <Typography variant="body2" gutterBottom>
          {formatDate(post.createdAt)}
        </Typography>
        <Markdown>{post.content}</Markdown>
      </Surface>
      {post.images.length > 0 && (
        <div className={styles.gallery}>
          {post.images.map((image) => (
            <Image
              key={image.id}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(max-width: 600px) 50vw, 300px"
              className={styles.thumb}
            />
          ))}
        </div>
      )}
    </main>
  );
}
