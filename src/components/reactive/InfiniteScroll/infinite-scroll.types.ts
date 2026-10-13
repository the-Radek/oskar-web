import type { ReactNode } from 'react';

export interface InfiniteScrollRenderProps {
  loading: boolean;
  failed: boolean;
  retry: () => void;
}

export interface InfiniteScrollProps {
  /** Called once when the trigger nears the viewport; throw/reject to report failure. */
  onLoadMore: () => Promise<void>;
  /** Stops observing, e.g. when there's nothing left to load. */
  disabled?: boolean;
  /** How far before entering the viewport to fire, defaults to `'800px'`. */
  rootMargin?: string;
  className?: string;
  children?: (state: InfiniteScrollRenderProps) => ReactNode;
}
