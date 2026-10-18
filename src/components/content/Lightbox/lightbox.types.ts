import type { ImageChunk, ImageInfo } from '@/lib/data/image/types';
import type { ImageFeedDirection } from '@/lib/validators/image-feed';

export interface LightboxProps {
  initial: {
    /** the image to open with its neighbours, in gallery order (newest first) */
    images: ImageInfo[];
    /** index of the image to open */
    index: number;
    hasOlder: boolean;
    hasNewer: boolean;
  };
  /** Next chunk beyond `edge` (the last image for `older`, the first for `newer`). */
  onLoadMore: (
    direction: ImageFeedDirection,
    edge: ImageInfo,
  ) => Promise<ImageChunk<ImageInfo>>;
  /** Called when the visible image changes (not for the initial one). */
  onView?: (image: ImageInfo) => void;
  onClose: () => void;
}
