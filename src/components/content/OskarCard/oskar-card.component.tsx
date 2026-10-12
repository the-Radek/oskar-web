import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import type { OskarCardProps } from './oskar-card.types';
import styles from './oskar-card.module.css';

export default function OskarCard({
  title,
  dateRange,
  text,
  price,
  image,
  imageAlt,
}: OskarCardProps) {
  return (
    <Card variant="outlined" className={styles.root}>
      <CardContent className={styles.content}>
        <Typography component="h2" variant="h2" align="center">
          {title}
        </Typography>
        <Typography variant="body2" align="center">
          {dateRange}
        </Typography>
        <Typography align="justify">{text}</Typography>
        <Typography align="center">Cena: {price}</Typography>
      </CardContent>
      <CardMedia className={styles.media}>
        <Image
          src={image}
          alt={imageAlt}
          placeholder="blur"
          sizes="(max-width: 400px) 100vw, (max-width: 900px) 400px, (max-width: 1200px) 33vw, 400px"
        />
      </CardMedia>
    </Card>
  );
}
