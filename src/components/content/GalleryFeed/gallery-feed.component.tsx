'use client';
import GalleryMosaic, { GalleryMosaicSkeleton } from '@/components/content/GalleryMosaic';
import InfiniteScroll from '@/components/reactive/InfiniteScroll';
import type { GalleryFeedProps } from './gallery-feed.types';
import { useGalleryFeed } from './gallery-feed.hooks';
import GallerySection from './gallery-feed.section';
import styles from './gallery-feed.module.css';

const MAX_PLACEHOLDERS = 36;

/**
 * Gallery grouped by year, loading more at both ends, with year headings to jump from. Knows
 * nothing about where the images come from or what the address is.
 */
export default function GalleryFeed(props: GalleryFeedProps) {
  const { years } = props;
  const { groups, hasMore, loadMore, pending, activeYear, jump, sections } = useGalleryFeed(props);

  const pendingCount = (pending && years.find((item) => item.year === pending)?.count) ?? 0;
  const section = { years, disabled: pending !== null, sections, onJump: jump };

  return (
    <>
      {hasMore.newer && pending === null && (
        <InfiniteScroll
          onLoadMore={() => loadMore('newer')}
          rootMargin="400px"
          loadingLabel="Načítání novějších fotografií"
          className={styles.status}
        />
      )}
      {pending !== null ? (
        <GallerySection year={pending} active {...section}>
          <GalleryMosaicSkeleton count={Math.min(pendingCount, MAX_PLACEHOLDERS)} />
        </GallerySection>
      ) : (
        groups.map(({ year, images }) => (
          <GallerySection key={year} year={year} active={year === activeYear} {...section}>
            <GalleryMosaic images={images} />
          </GallerySection>
        ))
      )}
      {hasMore.older && pending === null && (
        <InfiniteScroll
          onLoadMore={() => loadMore('older')}
          loadingLabel="Načítání dalších fotografií"
          className={styles.status}
        />
      )}
    </>
  );
}
