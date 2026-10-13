import type { Metadata } from 'next';
import metadataJson from '../metadata.json';
import { getImageThumbs } from '@/lib/actions/image';
import { FEED_CHUNK } from '../constants';
import Typography from '@mui/material/Typography';
import GalleryFeed from './feed';
import Surface from '@/components/layout/Surface';
import StuckActions from '@/components/layout/StuckActions';

export const metadata: Metadata = metadataJson;
export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  const initial = await getImageThumbs(null, FEED_CHUNK);

  return (
    <main>
      <Typography variant="h2">Galerie</Typography>
      {initial.images.length === 0 ? (
        <>
          <Surface variant="container">
            <p>Zatím tu nejsou žádné fotografie.</p>
          </Surface>
          <StuckActions />
        </>
      ) : (
        <GalleryFeed initial={initial} />
      )}
    </main>
  );
}
