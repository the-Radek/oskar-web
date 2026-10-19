export interface InfiniteScrollProps {
  /** Called once when the trigger nears the viewport; throw/reject to report failure. */
  onLoadMore: () => Promise<void>;
  /** Stops observing, e.g. when there's nothing left to load. */
  disabled?: boolean;
  /** How far before entering the viewport to fire, defaults to `'800px'`. */
  rootMargin?: string;
  className?: string;
  /** Accessible name of the default loading indicator. */
  loadingLabel?: string;
  /** Text of the default retry button. */
  retryText?: string;
}
