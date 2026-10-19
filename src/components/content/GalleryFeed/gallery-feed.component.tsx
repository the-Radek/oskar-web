'use client';
import { useMemo, useRef } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import type { ImageThumb } from '@/lib/data/image/types';
import GalleryMosaic, { GalleryMosaicSkeleton } from '@/components/content/GalleryMosaic';
import YearNav from '@/components/navigation/YearNav';
import InfiniteScroll from '@/components/reactive/InfiniteScroll';
import { useChunkedWindow } from '@/lib/utilities/use-chunked-window';
import type { GalleryFeedProps } from './gallery-feed.types';
import { groupByYear } from './gallery-feed.groups';
import { useActiveYear, useScrollAnchor, useYearJump } from './gallery-feed.hooks';
import styles from './gallery-feed.module.css';

const MAX_PLACEHOLDERS = 36;

/**
 * Gallery grouped by year, loading more at both ends, with year headings to jump from. Knows
 * nothing about where the images come from or what the address is.
 */
export default function GalleryFeed({
  initial,
  years,
  initialYear,
  onLoadMore,
  onLoadYear,
  onYearChange,
}: GalleryFeedProps) {
  const sections = useRef(new Map<number, HTMLElement>());
  const keepInPlace = useScrollAnchor();

  const {
    items: images,
    hasMore,
    loadMore,
    replace,
  } = useChunkedWindow<ImageThumb>({
    initial: { items: initial.images, hasOlder: initial.hasMore, hasNewer: false },
    load: async (direction, edge) => {
      const chunk = await onLoadMore(direction, edge);
      return { items: chunk.images, hasMore: chunk.hasMore };
    },
    onPrepend: keepInPlace,
  });
  const groups = useMemo(() => groupByYear(images), [images]);

  const { pending, jump } = useYearJump({
    groups,
    hasNewer: hasMore.newer,
    replace,
    loadYear: onLoadYear,
    sections,
    initialYear: years.some((item) => item.year === initialYear) ? initialYear : undefined,
  });
  const current = useActiveYear({ groups, pending, sections, onChange: onYearChange });

  const section = (year: number, children: React.ReactNode) => (
    <section
      key={year}
      ref={(node) => {
        if (node) sections.current.set(year, node);
        else sections.current.delete(year);
      }}
      className={styles.section}
      aria-labelledby={`gallery-year-${year}`}
    >
      <YearNav
        year={year}
        years={years}
        labelId={`gallery-year-${year}`}
        active={pending !== null || year === current}
        disabled={pending !== null}
        onJump={(target) => jump(target)}
      />
      {children}
    </section>
  );

  return (
    <>
      {hasMore.newer && pending === null && (
        <InfiniteScroll
          onLoadMore={() => loadMore('newer')}
          rootMargin="400px"
          className={styles.status}
        >
          {({ loading, failed, retry }) => (
            <>
              {loading && <CircularProgress size={28} aria-label="Načítání novějších fotografií" />}
              {failed && <Button onClick={retry}>Načtení se nezdařilo, zkusit znovu</Button>}
            </>
          )}
        </InfiniteScroll>
      )}
      {pending !== null
        ? section(
            pending,
            <GalleryMosaicSkeleton
              count={Math.min(
                years.find((item) => item.year === pending)?.count ?? 0,
                MAX_PLACEHOLDERS,
              )}
            />,
          )
        : groups.map(({ year, images }) => section(year, <GalleryMosaic images={images} />))}
      <InfiniteScroll
        onLoadMore={() => loadMore('older')}
        disabled={!hasMore.older || pending !== null}
        className={styles.status}
      >
        {({ loading, failed, retry }) => (
          <>
            {loading && <CircularProgress size={28} aria-label="Načítání dalších fotografií" />}
            {failed && <Button onClick={retry}>Načtení se nezdařilo, zkusit znovu</Button>}
            {!hasMore.older && pending === null && (
              <Typography variant="body2">To je vše.</Typography>
            )}
          </>
        )}
      </InfiniteScroll>
    </>
  );
}
