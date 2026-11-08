import {
  useCallback,
  useDebugValue,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from 'react';
import { flushSync } from 'react-dom';
import type { ImageSlot, ImageThumb } from '@/lib/data/image/types';
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
 * Keeps the view in place when years are added above it: call the returned function right before
 * adding them. Follows the first section still in view and scrolls by how far it moved, before the
 * browser paints. `feed` has to be `overflow-anchor: none`, or the browser corrects it as well.
 */
function useScrollAnchor(feed: RefObject<HTMLElement | null>) {
  const anchor = useRef<{ node: Element; top: number } | null>(null);
  // Updated together with the added years, so the effect runs in the commit that has them. An
  // effect on every commit could run in an earlier one and find nothing moved yet.
  const [added, setAdded] = useState(0);

  useLayoutEffect(() => {
    if (!anchor.current) return;
    const { node, top } = anchor.current;
    anchor.current = null;
    window.scrollBy({ top: node.getBoundingClientRect().top - top, behavior: 'instant' });
  }, [added]);

  return useCallback(() => {
    const sections = feed.current?.querySelectorAll('section') ?? [];
    const node = [...sections].find((section) => section.getBoundingClientRect().bottom > 0);
    anchor.current = node ? { node, top: node.getBoundingClientRect().top } : null;
    setAdded((count) => count + 1);
  }, [feed]);
}

// a batch of empty tiles asked for at once, and how far past the view they are asked for
const FILL_BATCH = 36;
const FILL_MARGIN = '600px 0px';

/**
 * Loads the images of the empty tiles (`[data-slot]`) in `feed` as they come near the view, one
 * batch after another. The tiles of a failed batch are asked for again when they next come near.
 */
function useThumbFill(
  feed: RefObject<HTMLElement | null>,
  items: ImageSlot[],
  onLoadThumbs: (ids: number[]) => Promise<ImageThumb[]>,
  onFill: (thumbs: ImageThumb[]) => void,
) {
  const latest = useRef({ onLoadThumbs, onFill });
  useLayoutEffect(() => {
    latest.current = { onLoadThumbs, onFill };
  });

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const near = new Map<number, Element>();
    const requested = new Set<number>();

    function takeBatch() {
      const ids: number[] = [];
      for (const [id, node] of near) {
        if (ids.length === FILL_BATCH) break;
        near.delete(id);
        if (node.hasAttribute('data-slot') && !requested.has(id)) ids.push(id);
      }
      return ids;
    }

    async function load() {
      const ids = takeBatch();
      if (ids.length === 0) return;

      ids.forEach((id) => requested.add(id));
      try {
        latest.current.onFill(await latest.current.onLoadThumbs(ids));
      } catch {
        // the tiles stay empty, see above
      } finally {
        ids.forEach((id) => requested.delete(id));
      }
      void load();
    }

    observer.current = new IntersectionObserver(
      (entries) => {
        for (const { target, isIntersecting } of entries) {
          if (!target.hasAttribute('data-slot')) {
            observer.current?.unobserve(target);
          } else if (isIntersecting) {
            near.set(Number(target.getAttribute('data-slot')), target);
          } else {
            near.delete(Number(target.getAttribute('data-slot')));
          }
        }
        void load();
      },
      { rootMargin: FILL_MARGIN },
    );

    return () => {
      observer.current?.disconnect();
      observer.current = null;
    };
  }, []);

  useEffect(() => {
    feed.current
      ?.querySelectorAll('[data-slot]')
      .forEach((node) => observer.current?.observe(node));
  }, [feed, items]);
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
 * Going to a year: scrolls to it when it is loaded, else shows a placeholder for it and swaps the
 * feed for the window at that year. `pending` is that year until it has loaded.
 */
function useYearJump({ groups, replace, loadYear, sections, initialYear }: YearJumpOptions) {
  const [pending, setPending] = useState<number | null>(() =>
    initialYear !== undefined && !groups.some((group) => group.year === initialYear)
      ? initialYear
      : null,
  );

  const jump = useCallback(
    async (year: number, animate = true) => {
      // years are loaded from their start, only the last one may be cut off at the bottom
      if (groups.some((group) => group.year === year)) {
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
    [groups, pending, replace, loadYear, sections],
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
  onLoadOlder,
  onLoadNewer,
  onLoadThumbs,
  onLoadYear,
  onYearChange,
}: GalleryFeedProps) {
  const feed = useRef<HTMLDivElement>(null);
  const sections = useSectionRegistry();
  const keepInPlace = useScrollAnchor(feed);

  const { items, hasMore, loadMore, replace, updateItems } = useChunkedWindow<ImageSlot>({
    initial: { items: initial.images, hasOlder: initial.hasMore, hasNewer: false },
    load: async (direction, edge) => {
      const chunk = await (direction === 'older' ? onLoadOlder(edge) : onLoadNewer(edge));
      return { items: chunk.images, hasMore: chunk.hasMore };
    },
    onPrepend: keepInPlace,
  });
  const groups = useMemo(() => groupByYear(items), [items]);

  useThumbFill(feed, items, onLoadThumbs, (thumbs) => {
    const byId = new Map(thumbs.map((thumb) => [thumb.id, thumb]));
    updateItems((current) => current.map((item) => byId.get(item.id) ?? item));
  });

  const { pending, jump } = useYearJump({
    groups,
    replace,
    loadYear: onLoadYear,
    sections,
    initialYear: years.some((item) => item.year === initialYear) ? initialYear : undefined,
  });
  const activeYear = useActiveYear(groups, pending, sections, onYearChange);

  return { feed, groups, hasMore, loadMore, pending, activeYear, jump, sections };
}
