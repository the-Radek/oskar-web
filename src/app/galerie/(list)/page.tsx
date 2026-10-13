import type { Metadata } from 'next';
import metadataJson from './metadata.json';
import { getImageThumbs } from '@/lib/actions/image';
import { FEED_CHUNK } from '../constants';
import GalleryFeed from './feed';
import Surface from '@/components/layout/Surface';
import StuckActions from '@/components/layout/StuckActions';

export const metadata: Metadata = metadataJson;
export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  const initial = await getImageThumbs(null, FEED_CHUNK);

  if (initial.images.length === 0) {
    return (
      <>
        <Surface variant="container">
          <p>Zatím tu nejsou žádné fotografie.</p>
        </Surface>
        <StuckActions />
      </>
    );
  }

  return <GalleryFeed initial={initial} />;
}
