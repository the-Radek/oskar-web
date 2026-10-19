import { useRef, useState } from 'react';

export type ChunkDirection = 'older' | 'newer';

export interface ChunkedWindow<T> {
  items: T[];
  hasOlder: boolean;
  hasNewer: boolean;
}

interface Options<T> {
  initial: ChunkedWindow<T>;
  /** Next chunk beyond `edge` (the last item for `older`, the first for `newer`). */
  load: (direction: ChunkDirection, edge: T) => Promise<{ items: T[]; hasMore: boolean }>;
  /** Called when a chunk was put before the current items, e.g. to keep the view in place. */
  onPrepend?: (count: number) => void;
}

/**
 * A window of an ordered sequence that grows at either end, or is swapped for another window.
 * Loads are one at a time per direction, and the result of a load started before `replace` is
 * dropped.
 */
export function useChunkedWindow<T>({ initial, load, onPrepend }: Options<T>) {
  const [items, setItems] = useState(initial.items);
  const [hasMore, setHasMore] = useState({ older: initial.hasOlder, newer: initial.hasNewer });
  const loading = useRef({ older: false, newer: false });
  const epoch = useRef(0);

  /**
   * Loads the next chunk in `direction`; rejects when loading failed.
   */
  async function loadMore(direction: ChunkDirection) {
    if (!hasMore[direction] || loading.current[direction]) return;

    const started = epoch.current;
    loading.current[direction] = true;
    try {
      const edge = direction === 'older' ? items[items.length - 1] : items[0];
      const chunk = await load(direction, edge);
      if (started !== epoch.current) return;

      if (direction === 'older') {
        setItems((current) => [...current, ...chunk.items]);
      } else {
        onPrepend?.(chunk.items.length);
        setItems((current) => [...chunk.items, ...current]);
      }
      setHasMore((current) => ({ ...current, [direction]: chunk.hasMore }));
    } finally {
      if (started === epoch.current) loading.current[direction] = false;
    }
  }

  function replace(next: ChunkedWindow<T>) {
    epoch.current++;
    loading.current = { older: false, newer: false };
    setItems(next.items);
    setHasMore({ older: next.hasOlder, newer: next.hasNewer });
  }

  return { items, hasMore, loadMore, replace };
}
