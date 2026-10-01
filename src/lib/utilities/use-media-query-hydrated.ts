import { useSyncExternalStore } from 'react';

/**
 * Like useMediaQuery, but returns null on the server and during hydration, so that the initial render is consistent between server and client.
 */
export function useMediaQueryHydrated(query: string): boolean | null {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => null,
  );
}
