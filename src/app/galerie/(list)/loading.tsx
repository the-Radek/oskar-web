import Typography from '@mui/material/Typography';
import { GalleryMosaicSkeleton } from '@/components/content/GalleryMosaic';
import { FEED_CHUNK } from '../constants';

export default function GalleryLoading() {
  return (
    <main>
      <Typography variant="h2">Galerie</Typography>
      <GalleryMosaicSkeleton count={FEED_CHUNK} />
    </main>
  );
}
