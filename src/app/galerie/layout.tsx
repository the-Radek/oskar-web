import type { ReactNode } from 'react';
import { Suspense } from 'react';
import Typography from '@mui/material/Typography';
import GalleryView from './view';
import { GalleryFeedSkeleton } from '@/components/content/GalleryFeed';
import { FEED_CHUNK } from './constants';

export const dynamic = 'force-dynamic';

export default function GalleryLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <Typography variant="h2">Galerie</Typography>
      <Suspense fallback={<GalleryFeedSkeleton count={FEED_CHUNK} />}>
        <GalleryView />
      </Suspense>
      {children}
    </main>
  );
}
