import { GalleryMosaicSkeleton } from '@/components/content/GalleryMosaic';
import GallerySection from './gallery-feed.section';

const year = new Date().getFullYear();

export function GalleryFeedSkeleton({ count }: { count: number }) {
  return (
    <GallerySection year={year} active disabled>
      <GalleryMosaicSkeleton count={count} />
    </GallerySection>
  );
}
