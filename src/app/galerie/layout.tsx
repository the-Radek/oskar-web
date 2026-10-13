import type { ReactNode } from 'react';
import { Suspense } from 'react';
import Typography from '@mui/material/Typography';
import GalleryView from './view';
import GalleryFeedSkeleton from './feed.skeleton';

export const dynamic = 'force-dynamic';

export default function GalleryLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <Typography variant="h2">Galerie</Typography>
      <Suspense fallback={<GalleryFeedSkeleton />}>
        <GalleryView />
      </Suspense>
      {children}
    </main>
  );
}
