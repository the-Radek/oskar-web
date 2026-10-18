import type { ImageThumb } from '@/lib/actions/image';

export interface GalleryMosaicProps {
  images: Pick<ImageThumb, 'id' | 'src' | 'alt' | 'width' | 'height' | 'blurDataURL'>[];
  className?: string;
}
