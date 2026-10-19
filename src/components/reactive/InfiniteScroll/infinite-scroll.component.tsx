'use client';
import { useEffect, useRef, useState } from 'react';
import type { InfiniteScrollProps } from './infinite-scroll.types';

const DEFAULT_ROOT_MARGIN = '800px';

export default function InfiniteScroll({
  onLoadMore,
  disabled = false,
  rootMargin = DEFAULT_ROOT_MARGIN,
  className,
  children,
}: InfiniteScrollProps) {
  const sentinel = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  /**
   * Watches `sentinel` and fires `onLoadMore` once it nears the viewport (by `rootMargin`).
   * Each successful load gives the caller a new `onLoadMore` closure (next cursor).
   */
  useEffect(() => {
    const node = sentinel.current;
    if (!node || disabled || failed) return;

    let cancelled = false;
    // observe the the intersection of the node with the viewport
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setLoading(true);
        try {
          await onLoadMore();
        } catch {
          if (!cancelled) setFailed(true);
        } finally {
          if (!cancelled) setLoading(false);
        }
      },
      { rootMargin },
    );
    observer.observe(node);

    return () => {
      // cleanup on unmount or when dependencies change
      cancelled = true;
      setLoading(false);
      observer.disconnect();
    };
  }, [disabled, failed, onLoadMore, rootMargin]);

  return (
    <div ref={sentinel} className={className} role="status">
      {children?.({ loading, failed, retry: () => setFailed(false) })}
    </div>
  );
}
