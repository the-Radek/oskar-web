import {
  useCallback,
  useDebugValue,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { flushSync } from 'react-dom';
import type { ImageThumb } from '@/lib/data/image/types';
import { useChunkedWindow } from '@/lib/utilities/use-chunked-window';
import type {
  GalleryFeedProps,
  SectionRegistry,
  YearGroup,
  YearJumpOptions,
} from './gallery-feed.types';
import { groupByYear } from './gallery-feed.groups';

// jumps to a year within this many screens are animated, farther ones are instant
const SMOOTH_SCREENS = 3;
const TOP_TOLERANCE = 2;

/**
 * Tracks the section element of each year, so the feed can measure and scroll to it. Pass
 * `register(year)` as the section's ref.
 */
function useSectionRegistry(): SectionRegistry {
  const sections = useRef(new Map<number, HTMLElement>());
  useDebugValue(sections, (ref) => [...ref.current.keys()]);

  return useMemo(
    () => ({
      register: (year) => (node) => {
        if (node) sections.current.set(year, node);
        else sections.current.delete(year);
      },
      get: (year) => sections.current.get(year),
    }),
    [],
  );
}

/**
 * Keeps the view in place when images are added above it: call the returned function right before
 * adding them.
 */
function useScrollAnchor() {
  const heightBefore = useRef<number | null>(null);

  useLayoutEffect(() => {
    if (heightBefore.current === null) return;
    window.scrollBy(0, document.documentElement.scrollHeight - heightBefore.current);
    heightBefore.current = null;
  });

  return useCallback(() => {
    heightBefore.current = document.documentElement.scrollHeight;
  }, []);
}

/**
 * Runs `callback` once and then on scroll, at most once per frame.
 */
function useScrollFrame(callback: () => void) {
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      frame ||= requestAnimationFrame(() => {
        frame = 0;
        callback();
      });
    };

    callback();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [callback]);
}

function yearAtTop(groups: YearGroup[], sections: SectionRegistry) {
  let year = groups[0]?.year;
  for (const group of groups) {
    const section = sections.get(group.year);
    if (section && section.getBoundingClientRect().top <= TOP_TOLERANCE) year = group.year;
  }
  return year;
}

/**
 * The year whose heading is at the top of the view, or the first year while the view is above the
 * feed. Held back while a year is being loaded.
 */
function useActiveYear(
  groups: YearGroup[],
  pending: number | null,
  sections: SectionRegistry,
  onChange?: (year: number) => void,
) {
  const [active, setActive] = useState(groups[0]?.year);

  useScrollFrame(
    useCallback(() => {
      const year = yearAtTop(groups, sections);
      if (pending === null && year !== undefined) setActive(year);
    }, [groups, pending, sections]),
  );

  useEffect(() => {
    if (active !== undefined) onChange?.(active);
  }, [active, onChange]);

  return active;
}

function scrollToSection(section: HTMLElement | undefined, animate: boolean) {
  if (!section) return;
  const near = Math.abs(section.getBoundingClientRect().top) < SMOOTH_SCREENS * window.innerHeight;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  section.scrollIntoView({
    block: 'start',
    behavior: animate && near && !reduced ? 'smooth' : 'auto',
  });
}

/**
 * Going to a year: scrolls to it when it is loaded from its start, else shows a placeholder for it
 * and swaps the feed for the window at that year. `pending` is that year until it has loaded.
 */
function useYearJump({
  groups,
  hasNewer,
  replace,
  loadYear,
  sections,
  initialYear,
}: YearJumpOptions) {
  const [pending, setPending] = useState<number | null>(() =>
    initialYear !== undefined && !groups.some((group) => group.year === initialYear)
      ? initialYear
      : null,
  );

  const jump = useCallback(
    async (year: number, animate = true) => {
      const index = groups.findIndex((group) => group.year === year);
      // a year cut off at the top isn't loaded from its start
      if (index > 0 || (index === 0 && !hasNewer)) {
        scrollToSection(sections.get(year), animate);
        return;
      }

      const scrollBefore = window.scrollY;
      // flushSync: the sections have to be in the DOM before they are scrolled to
      if (pending !== year) {
        flushSync(() => setPending(year));
        sections.get(year)?.scrollIntoView({ block: 'start' });
      }
      try {
        const next = await loadYear(year);
        flushSync(() => {
          replace({ items: next.images, hasOlder: next.hasOlder, hasNewer: next.hasNewer });
          setPending(null);
        });
        sections.get(year)?.scrollIntoView({ block: 'start' });
      } catch {
        flushSync(() => setPending(null));
        window.scrollTo({ top: scrollBefore });
      }
    },
    [groups, hasNewer, pending, replace, loadYear, sections],
  );

  const started = useRef(false);
  useEffect(() => {
    if (started.current || initialYear === undefined) return;
    started.current = true;
    void jump(initialYear, false);
  }, [initialYear, jump]);

  return { pending, jump };
}

/**
 * State of the gallery feed: loaded images grouped by year, loading at both ends, jumping to a
 * year and the year at the top of the view.
 */
export function useGalleryFeed({
  initial,
  years,
  initialYear,
  onLoadMore,
  onLoadYear,
  onYearChange,
}: GalleryFeedProps) {
  const sections = useSectionRegistry();
  const keepInPlace = useScrollAnchor();

  const { items, hasMore, loadMore, replace } = useChunkedWindow<ImageThumb>({
    initial: { items: initial.images, hasOlder: initial.hasMore, hasNewer: false },
    load: async (direction, edge) => {
      const chunk = await onLoadMore(direction, edge);
      return { items: chunk.images, hasMore: chunk.hasMore };
    },
    onPrepend: keepInPlace,
  });
  const groups = useMemo(() => groupByYear(items), [items]);

  const { pending, jump } = useYearJump({
    groups,
    hasNewer: hasMore.newer,
    replace,
    loadYear: onLoadYear,
    sections,
    initialYear: years.some((item) => item.year === initialYear) ? initialYear : undefined,
  });
  const activeYear = useActiveYear(groups, pending, sections, onYearChange);

  return { groups, hasMore, loadMore, pending, activeYear, jump, sections };
}
