import { getImageYears } from '@/lib/data/image/years';
import { getThumbChunk } from '@/lib/data/image/thumbs';
import { FEED_CHUNK } from './constants';
import GalleryFeed from './feed';
import Surface from '@/components/layout/Surface';
import StuckActions from '@/components/layout/StuckActions';

export default async function GalleryView() {
  const [initial, years] = await Promise.all([
    getThumbChunk(null, 'older', FEED_CHUNK),
    getImageYears(),
  ]);

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

  return <GalleryFeed initial={initial} years={years} />;
}
