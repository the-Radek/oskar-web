'use client';
import { useSyncExternalStore } from 'react';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
import type { GoBackButtonProps } from './go-back-button.types';

// the part of the Navigation API we use; the project's TypeScript lib.dom doesn't declare it
interface NavigationLike {
  currentEntry: { index: number } | null;
  entries(): { url: string | null }[];
}

/**
 * Path of the previous same-origin history entry, via the Navigation API.
 * Unlike document.referrer, it also follows client-side navigations.
 *
 * @returns the path, or null when there is no previous entry or the API is unsupported
 */
function previousPathname(): string | null {
  const navigation = (window as { navigation?: NavigationLike }).navigation;
  const index = navigation?.currentEntry?.index;
  const url = index === undefined ? undefined : navigation?.entries()[index - 1]?.url;
  return url ? new URL(url).pathname : null;
}

export default function GoBackButton({ from, children, ...rest }: GoBackButtonProps) {
  const router = useRouter();
  // hydratation safe check for the previous path
  const visible = useSyncExternalStore(
    () => () => {}, // dummy subscribe
    () => from === undefined || previousPathname() === from,
    () => from === undefined,
  );

  if (!visible) return null;

  return (
    <Button
      variant="outlined"
      startIcon={<ArrowBackIcon />}
      onClick={() => router.back()}
      {...rest}
    >
      {children}
    </Button>
  );
}
