import Image from 'next/image';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import IconImage from '@/components/content/IconImage';
import { formatDate } from '@/lib/utilities/format-date';
import type { PostListingProps } from './post-listing.types';
import styles from './post-listing.module.css';
import clsx from 'clsx';

export default function PostListing({ posts, className }: PostListingProps) {
  return (
    <div className={clsx(styles.root, className)}>
      {posts.map((post) => (
        <Card key={post.id} variant="outlined" className={styles.card}>
          <CardActionArea component={Link} href={`/clanky/${post.id}`} className={styles.row}>
            <CardMedia className={styles.media}>
              {post.image ? (
                <Image
                  src={post.image.src}
                  alt={post.image.alt}
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 850px) 50vw, (max-width: 900px) 33vw, 200px"
                />
              ) : (
                <IconImage />
              )}
            </CardMedia>
            <CardContent className={styles.content}>
              <Typography component="h2" variant="h2">
                {post.title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {formatDate(new Date(post.createdAt))}
              </Typography>
              <Typography align="justify">{post.excerpt}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
}
