'use client';
import { useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import GalleryFeed from '@/components/content/GalleryFeed';
import type { GalleryFeedProps } from '@/components/content/GalleryFeed';
import { loadByYear, loadThumbChunk } from './actions';

const YEAR_PARAM = 'year';

/**
 * The gallery feed wired to the server actions and the address: the year at the top is kept in
 * `?year=` (left out for the newest), so a reload or a shared link returns to it.
 */
export default function GalleryFeedView({
  initial,
  years,
}: Pick<GalleryFeedProps, 'initial' | 'years'>) {
  const searchParams = useSearchParams();
  const requested = Number(searchParams.get(YEAR_PARAM)) || undefined;

  const handleYearChange = useCallback(
    (year: number) => {
      // the lightbox moves the address on, it isn't ours then
      if (window.location.pathname !== '/galerie') return;
      const url = new URL(window.location.href);
      if (year === years[0]?.year) url.searchParams.delete(YEAR_PARAM);
      else url.searchParams.set(YEAR_PARAM, String(year));
      if (url.href !== window.location.href) window.history.replaceState(null, '', url);
    },
    [years],
  );

  return (
    <GalleryFeed
      initial={initial}
      years={years}
      initialYear={requested}
      onLoadMore={(direction, edge) =>
        loadThumbChunk({ createdAt: edge.createdAt, id: edge.id }, direction)
      }
      onLoadYear={loadByYear}
      onYearChange={handleYearChange}
    />
  );
}
