import Typography from '@mui/material/Typography';
import { GalleryMosaicSkeleton } from '@/components/content/GalleryMosaic';
import { FEED_CHUNK } from '../constants';
import styles from './feed.module.css';

const year = new Date().getFullYear();

export default function GalleryLoading() {
  return (
    <section key={year} className={styles.section} aria-labelledby={`gallery-year-${year}`}>
      <Typography id={`gallery-year-${year}`} variant="h3" className={styles.year}>
        {year}
      </Typography>
      <GalleryMosaicSkeleton count={FEED_CHUNK} />
    </section>
  );
}
