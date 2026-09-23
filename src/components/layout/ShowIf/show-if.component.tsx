'use client';
import { cloneElement, Fragment, isValidElement, useSyncExternalStore } from 'react';
import { BREAKPOINTS, type Breakpoint, type ShowIfProps } from './show-if.types';
import styles from './show-if.module.css';
import clsx from 'clsx';

function buildQuery(below?: Breakpoint, above?: Breakpoint): string {
  const parts: string[] = [];
  if (below) parts.push(`(width <= ${BREAKPOINTS[below]}px)`);
  if (above) parts.push(`(width > ${BREAKPOINTS[above]}px)`);
  return parts.join(' and ');
}

/**
 * Like useMediaQuery, but returns null on the server and during hydration, so that the initial render is consistent between server and client.
 */
function useMediaQueryHydrated(query: string): boolean | null {
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

export default function ShowIf({ below, above, children }: ShowIfProps) {
  const matches = useMediaQueryHydrated(buildQuery(below, above));

  if (matches === false) return null;

  const classes = clsx(below && styles[`below-${below}`], above && styles[`above-${above}`]);

  if (isValidElement<{ className?: string }>(children) && children.type !== Fragment) {
    return cloneElement(children, {
      className: clsx(children.props.className, classes),
    });
  }

  return <div className={classes}>{children}</div>;
}
