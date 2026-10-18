import type { Metadata } from 'next';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import { notFound } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Surface from '@/components/layout/Surface';
import Markdown from '@/components/content/Markdown';
import GalleryMosaic from '@/components/content/GalleryMosaic';
import { getPost } from '@/lib/data/post/post';
import { formatDate } from '@/lib/utilities/format-date';
import styles from './page.module.css';
import GoBackButton from '@/components/navigation/GoBackButton';
import { parseId } from '@/lib/utilities/parse-id';

export async function generateMetadata({ params }: PageProps<'/clanky/[id]'>): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(parseId(id) ?? notFound());
  if (!post) notFound();
  return { title: post.title };
}

export default async function PostDetailPage({ params }: PageProps<'/clanky/[id]'>) {
  const { id } = await params;
  const post = await getPost(parseId(id) ?? notFound());
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
        <Typography variant="h1">{post.title}</Typography>
        <Typography variant="body2" gutterBottom>
          {formatDate(post.createdAt)}
        </Typography>
        {post.image && (
          <Image
            src={post.image.src}
            alt={post.image.alt}
            placeholder={post.image.blurDataURL ? 'blur' : 'empty'}
            blurDataURL={post.image.blurDataURL}
            width={post.image.width}
            height={post.image.height}
            sizes="(max-width: 350px) 100vw, (max-width: 600px) 350px, (max-width: 900px) 200px, 300px"
            priority
            className={styles.image}
          />
        )}
        <Markdown>{post.content}</Markdown>
      </Surface>
      {post.images.length > 0 && <GalleryMosaic images={post.images} />}
    </main>
  );
}
