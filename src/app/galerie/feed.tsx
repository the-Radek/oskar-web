'use client';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import type { ImageChunk, ImageThumb, ImageYear } from '@/lib/data/image/types';
import GalleryMosaic, { GalleryMosaicSkeleton } from '@/components/content/GalleryMosaic';
import InfiniteScroll from '@/components/reactive/InfiniteScroll';
import { useChunkedWindow } from '@/lib/utilities/use-chunked-window';
import styles from './feed.module.css';
import { loadByYear, loadThumbChunk } from './actions';
import { FEED_CHUNK } from './constants';
import YearNav from './year-nav';

const YEAR_PARAM = 'year';
// jumps to a year within this many screens are animated, farther ones are instant
const SMOOTH_SCREENS = 3;

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

function scrollToSection(section: HTMLElement, animate: boolean) {
  const near = Math.abs(section.getBoundingClientRect().top) < SMOOTH_SCREENS * window.innerHeight;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  section.scrollIntoView({
    block: 'start',
    behavior: animate && near && !reduced ? 'smooth' : 'auto',
  });
}

interface GalleryFeedProps {
  initial: ImageChunk<ImageThumb>;
  years: ImageYear[];
}

export default function GalleryFeed({ initial, years }: GalleryFeedProps) {
  const searchParams = useSearchParams();
  const sections = useRef(new Map<number, HTMLElement>());
  // set to the page height before images are put above the view, to keep the view in place
  const heightBefore = useRef<number | null>(null);
  // year to keep at the top of the view while the feed changes under it
  const target = useRef<number | null>(null);
  const restoreScroll = useRef<number | null>(null);

  // a year asked for in the address that isn't in the first chunk is loaded right away
  const [requested] = useState(() => {
    const year = Number(searchParams.get(YEAR_PARAM));
    return years.some((item) => item.year === year) ? year : null;
  });
  // the year whose heading is at the top, or the first one while the view is above the feed
  const [current, setCurrent] = useState(() =>
    new Date(initial.images[0].createdAt).getUTCFullYear(),
  );
  const [pending, setPending] = useState<number | null>(() =>
    requested !== null && !groupByYear(initial.images).some((group) => group.year === requested)
      ? requested
      : null,
  );

  const chunkedWindow = useChunkedWindow<ImageThumb>({
    initial: { items: initial.images, hasOlder: initial.hasMore, hasNewer: false },
    load: async (direction, edge) => {
      const chunk = await loadThumbChunk({ createdAt: edge.createdAt, id: edge.id }, direction);
      return { items: chunk.images, hasMore: chunk.hasMore };
    },
    onPrepend: () => {
      heightBefore.current = document.documentElement.scrollHeight;
    },
  });
  const { items: images, hasMore, loadMore, replace } = chunkedWindow;
  const groups = useMemo(() => groupByYear(images), [images]);

  useLayoutEffect(() => {
    if (heightBefore.current !== null) {
      window.scrollBy(0, document.documentElement.scrollHeight - heightBefore.current);
      heightBefore.current = null;
    }

    if (target.current !== null) {
      sections.current.get(target.current)?.scrollIntoView({ block: 'start' });
      if (pending === null) target.current = null;
    } else if (restoreScroll.current !== null && pending === null) {
      window.scrollTo({ top: restoreScroll.current });
      restoreScroll.current = null;
    }
  }, [images, pending]);

  const jump = useCallback(
    async (year: number, animate = true) => {
      const index = groups.findIndex((group) => group.year === year);
      // a year cut off at the top isn't loaded from its start
      if (index > 0 || (index === 0 && !hasMore.newer)) {
        const section = sections.current.get(year);
        if (section) scrollToSection(section, animate);
        return;
      }

      restoreScroll.current = window.scrollY;
      target.current = year;
      setPending(year);
      try {
        const next = await loadByYear(year);
        replace({ items: next.images, hasOlder: next.hasOlder, hasNewer: next.hasNewer });
        restoreScroll.current = null;
      } catch {
        target.current = null;
      } finally {
        setPending(null);
      }
    },
    [groups, hasMore.newer, replace],
  );

  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    if (requested !== null) void jump(requested, false);
  }, [requested, jump]);

  // tracks the year at the top, and keeps it in the address so a reload or a shared link returns
  useEffect(() => {
    if (pending !== null) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      let year = groups[0]?.year;
      for (const group of groups) {
        const section = sections.current.get(group.year);
        if (section && section.getBoundingClientRect().top <= 2) year = group.year;
      }
      if (year === undefined) return;
      setCurrent(year);

      if (window.location.pathname !== '/galerie') return;
      const url = new URL(window.location.href);
      if (year === years[0]?.year) url.searchParams.delete(YEAR_PARAM);
      else url.searchParams.set(YEAR_PARAM, String(year));
      if (url.href !== window.location.href) window.history.replaceState(null, '', url);
    };
    const onScroll = () => {
      frame ||= requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [groups, years, pending]);

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
        onJump={(year) => jump(year)}
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
              count={Math.min(years.find((item) => item.year === pending)?.count ?? 0, FEED_CHUNK)}
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
