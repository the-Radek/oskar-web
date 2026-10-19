import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { ImageThumb, ImageThumbWindow } from '@/lib/data/image/types';
import type { ChunkedWindow } from '@/lib/utilities/use-chunked-window';
import type { YearGroup } from './gallery-feed.groups';

type Sections = React.RefObject<Map<number, HTMLElement>>;

// jumps to a year within this many screens are animated, farther ones are instant
const SMOOTH_SCREENS = 3;

function scrollToSection(section: HTMLElement, animate: boolean) {
  const near = Math.abs(section.getBoundingClientRect().top) < SMOOTH_SCREENS * window.innerHeight;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  section.scrollIntoView({
    block: 'start',
    behavior: animate && near && !reduced ? 'smooth' : 'auto',
  });
}

/**
 * Keeps the view in place when images are put above it: call the returned function right before
 * adding them, and the scroll position is moved by the height they took.
 */
export function useScrollAnchor() {
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

interface YearJumpOptions {
  groups: YearGroup[];
  hasNewer: boolean;
  /** Swaps the loaded window of the feed. */
  replace: (window: ChunkedWindow<ImageThumb>) => void;
  loadYear: (year: number) => Promise<ImageThumbWindow>;
  sections: Sections;
  /** year to go to once mounted */
  initialYear?: number;
}

/**
 * Going to a year: scrolls to it when it is loaded from its start, else swaps the feed for the
 * window at that year. `pending` is that year while loading, when the feed shows a placeholder.
 */
export function useYearJump({
  groups,
  hasNewer,
  replace,
  loadYear,
  sections,
  initialYear,
}: YearJumpOptions) {
  // the year to keep at the top of the view while the feed changes under it
  const target = useRef<number | null>(null);
  const restoreScroll = useRef<number | null>(null);
  const [pending, setPending] = useState<number | null>(() =>
    initialYear !== undefined && !groups.some((group) => group.year === initialYear)
      ? initialYear
      : null,
  );

  useLayoutEffect(() => {
    if (target.current !== null) {
      sections.current.get(target.current)?.scrollIntoView({ block: 'start' });
      if (pending === null) target.current = null;
    } else if (restoreScroll.current !== null && pending === null) {
      window.scrollTo({ top: restoreScroll.current });
      restoreScroll.current = null;
    }
  }, [groups, pending, sections]);

  const jump = useCallback(
    async (year: number, animate = true) => {
      const index = groups.findIndex((group) => group.year === year);
      // a year cut off at the top isn't loaded from its start
      if (index > 0 || (index === 0 && !hasNewer)) {
        const section = sections.current.get(year);
        if (section) scrollToSection(section, animate);
        return;
      }

      restoreScroll.current = window.scrollY;
      target.current = year;
      setPending(year);
      try {
        const next = await loadYear(year);
        replace({ items: next.images, hasOlder: next.hasOlder, hasNewer: next.hasNewer });
        restoreScroll.current = null;
      } catch {
        target.current = null;
      } finally {
        setPending(null);
      }
    },
    [groups, hasNewer, replace, loadYear, sections],
  );

  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    if (initialYear !== undefined) void jump(initialYear, false);
  }, [initialYear, jump]);

  return { pending, jump };
}

interface ActiveYearOptions {
  groups: YearGroup[];
  /** the year being jumped to, while loading */
  pending: number | null;
  sections: Sections;
  onChange?: (year: number) => void;
}

/**
 * The year whose heading is at the top of the view, or the first one while the view is above the
 * feed.
 */
export function useActiveYear({ groups, pending, sections, onChange }: ActiveYearOptions) {
  const [current, setCurrent] = useState(groups[0]?.year);
  const notify = useRef(onChange);
  const reported = useRef<number>(undefined);

  useEffect(() => {
    notify.current = onChange;
  });

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
      if (year !== reported.current) {
        reported.current = year;
        notify.current?.(year);
      }
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
  }, [groups, pending, sections]);

  return current;
}
