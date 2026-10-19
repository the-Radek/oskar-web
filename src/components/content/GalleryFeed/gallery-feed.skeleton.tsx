import { GalleryMosaicSkeleton } from '@/components/content/GalleryMosaic';
import YearNav from '@/components/navigation/YearNav';
import styles from './gallery-feed.module.css';

const year = new Date().getFullYear();

export function GalleryFeedSkeleton({ count }: { count: number }) {
  const labelId = `gallery-year-${year}`;

  return (
    <section className={styles.section} aria-labelledby={labelId}>
      <YearNav year={year} labelId={labelId} active disabled />
      <GalleryMosaicSkeleton count={count} />
    </section>
  );
}
