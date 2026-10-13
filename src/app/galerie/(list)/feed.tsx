'use client';
import { useCallback, useMemo, useState } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import type { ImageChunk, ImageThumb } from '@/lib/actions/image';
import GalleryMosaic from '@/components/content/GalleryMosaic';
import InfiniteScroll from '@/components/reactive/InfiniteScroll';
import styles from './feed.module.css';
import { loadFeedChunk } from './feed.actions';

/**
 * Splits images (already ordered newest first) into consecutive runs of the same year.
 */
function groupByYear(images: ImageThumb[]) {
  const groups: { year: number; images: ImageThumb[] }[] = [];
  for (const image of images) {
    const year = new Date(image.createdAt).getUTCFullYear();
    const last = groups.at(-1);
    if (last?.year === year) last.images.push(image);
    else groups.push({ year, images: [image] });
  }
  return groups;
}

export default function GalleryFeed({ initial }: { initial: ImageChunk<ImageThumb> }) {
  const [images, setImages] = useState(initial.images);
  const [hasMore, setHasMore] = useState(initial.hasMore);
  const groups = useMemo(() => groupByYear(images), [images]);
  const last = images.at(-1);

  const handleLoadMore = useCallback(async () => {
    if (!last) return;
    const chunk = await loadFeedChunk({ createdAt: last.createdAt, id: last.id });
    setImages((current) => [...current, ...chunk.images]);
    setHasMore(chunk.hasMore);
  }, [last]);

  return (
    <>
      {groups.map(({ year, images }) => (
        <section key={year} className={styles.section} aria-labelledby={`gallery-year-${year}`}>
          <Typography
            id={`gallery-year-${year}`}
            variant="h3"
            component="h2"
            className={styles.year}
          >
            {year}
          </Typography>
          <GalleryMosaic images={images} />
        </section>
      ))}
      <InfiniteScroll onLoadMore={handleLoadMore} disabled={!hasMore} className={styles.status}>
        {({ loading, failed, retry }) => (
          <>
            {loading && <CircularProgress size={28} aria-label="Načítání dalších fotografií" />}
            {failed && <Button onClick={retry}>Načtení se nezdařilo, zkusit znovu</Button>}
            {!hasMore && <Typography variant="body2">To je vše.</Typography>}
          </>
        )}
      </InfiniteScroll>
    </>
  );
}
