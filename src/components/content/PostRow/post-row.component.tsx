import Image from 'next/image';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import IconImage from '@/components/content/IconImage';
import { formatDate } from '@/lib/utilities/format-date';
import { excerpt } from '@/lib/utilities/excerpt';
import type { PostRowProps } from './post-row.types';
import styles from './post-row.module.css';

export default function PostRow({ post }: PostRowProps) {
  return (
    <Card variant="outlined" className={styles.root}>
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
            {formatDate(post.createdAt)}
          </Typography>
          <Typography align="justify">{excerpt(post.content, 300)}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
