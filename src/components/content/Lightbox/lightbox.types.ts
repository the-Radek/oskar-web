import type { ImageChunk, ImageSummary } from '@/lib/actions/image';
import type { ImageFeedDirection } from '@/lib/validators/image-feed';

export interface LightboxProps {
  initial: {
    /** the image to open with its neighbours, in gallery order (newest first) */
    images: ImageSummary[];
    /** index of the image to open */
    index: number;
    hasOlder: boolean;
    hasNewer: boolean;
  };
  /** Next chunk beyond `edge` (the last image for `older`, the first for `newer`). */
  onLoadMore: (
    direction: ImageFeedDirection,
    edge: ImageSummary,
  ) => Promise<ImageChunk<ImageSummary>>;
  /** Called when the visible image changes (not for the initial one). */
  onView?: (image: ImageSummary) => void;
  onClose: () => void;
}
