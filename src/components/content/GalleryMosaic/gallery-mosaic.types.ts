import type { ImageThumb } from '@/lib/data/image/types';

export interface GalleryMosaicProps {
  images: Pick<ImageThumb, 'id' | 'src' | 'alt' | 'width' | 'height' | 'blurDataURL'>[];
  className?: string;
}
