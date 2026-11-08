import type { ImageLayout, ImageThumb } from '@/lib/data/image/types';

export type MosaicImage = Pick<
  ImageThumb,
  'id' | 'src' | 'alt' | 'width' | 'height' | 'blurDataURL'
>;

/** An image that isn't loaded yet: an empty tile of the right shape is shown for it. */
export type MosaicSlot = Pick<ImageLayout, 'id' | 'width' | 'height'>;

export interface GalleryMosaicProps {
  images: (MosaicImage | MosaicSlot)[];
  className?: string;
}
