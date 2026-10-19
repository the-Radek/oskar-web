import { GalleryMosaicSkeleton } from '@/components/content/GalleryMosaic';
import YearNav from '@/components/navigation/YearNav';
import styles from './gallery-feed.module.css';

const year = new Date().getFullYear();

export function GalleryFeedSkeleton({ count }: { count: number }) {
  return (
    <section className={styles.section} aria-labelledby={`gallery-year-${year}`}>
      <YearNav year={year} years={[]} labelId={`gallery-year-${year}`} active={false} />
      <GalleryMosaicSkeleton count={count} />
    </section>
  );
}
