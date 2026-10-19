import Typography from '@mui/material/Typography';
import { GalleryMosaicSkeleton } from '@/components/content/GalleryMosaic';
import { FEED_CHUNK } from './constants';
import styles from './feed.module.css';

const year = new Date().getFullYear();

export default function GalleryFeedSkeleton() {
  return (
    <section key={year} className={styles.section} aria-labelledby={`gallery-year-${year}`}>
      <div className={styles.year}>
        <Typography id={`gallery-year-${year}`} variant="h3" className={styles.title}>
          {year}
        </Typography>
      </div>
      <GalleryMosaicSkeleton count={FEED_CHUNK} />
    </section>
  );
}
