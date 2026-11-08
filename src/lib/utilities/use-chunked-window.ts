import { useDebugValue, useRef, useState } from 'react';

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
  // What loadMore goes by. Unlike the state, it is current before the next render, where a load
  // that follows right after one would else ask for the same chunk again.
  const edges = useRef({ older: initial.items.at(-1), newer: initial.items[0] });
  const more = useRef({ older: initial.hasOlder, newer: initial.hasNewer });
  useDebugValue({ items, hasMore, loading }, (debug) => ({
    items: debug.items.length,
    hasMore: debug.hasMore,
    loading: debug.loading.current,
  }));

  /**
   * Loads the next chunk in `direction`; rejects when loading failed.
   */
  async function loadMore(direction: ChunkDirection) {
    if (!more.current[direction] || loading.current[direction]) return;

    const started = epoch.current;
    loading.current[direction] = true;
    try {
      const chunk = await load(direction, edges.current[direction] as T);
      if (started !== epoch.current) return;

      if (direction === 'older') {
        edges.current.older = chunk.items.at(-1) ?? edges.current.older;
        setItems((current) => [...current, ...chunk.items]);
      } else {
        edges.current.newer = chunk.items[0] ?? edges.current.newer;
        onPrepend?.(chunk.items.length);
        setItems((current) => [...chunk.items, ...current]);
      }
      more.current[direction] = chunk.hasMore;
      setHasMore((current) => ({ ...current, [direction]: chunk.hasMore }));
    } finally {
      if (started === epoch.current) loading.current[direction] = false;
    }
  }

  function replace(next: ChunkedWindow<T>) {
    epoch.current++;
    loading.current = { older: false, newer: false };
    edges.current = { older: next.items.at(-1), newer: next.items[0] };
    more.current = { older: next.hasOlder, newer: next.hasNewer };
    setItems(next.items);
    setHasMore({ older: next.hasOlder, newer: next.hasNewer });
  }

  /**
   * Changes the items in place, e.g. to fill in details of some of them. Not a way to add,
   * remove or reorder items: those would not count as loaded or replaced, and the first and last
   * item that loading goes by are not looked up again.
   */
  function updateItems(update: (current: T[]) => T[]) {
    setItems(update);
  }

  return { items, hasMore, loadMore, replace, updateItems };
}
