import type { ImageChunk, ImageThumb, ImageThumbWindow, ImageYear } from '@/lib/data/image/types';
import type { ImageFeedDirection } from '@/lib/validators/image-feed';

export interface GalleryFeedProps {
  /** The first chunk, newest first */
  initial: ImageChunk<ImageThumb>;
  /** All available years with images, newest first */
  years: ImageYear[];
  /** Year to start at instead of the newest one; ignored when it has no images. */
  initialYear?: number;
  /** Next chunk beyond `edge` (the last image for `older`, the first for `newer`). */
  onLoadMore: (direction: ImageFeedDirection, edge: ImageThumb) => Promise<ImageChunk<ImageThumb>>;
  /** The feed starting at `year`, with some images of the year before it. */
  onLoadYear: (year: number) => Promise<ImageThumbWindow>;
  /** Called when the year at the top of the view changes. */
  onYearChange?: (year: number) => void;
}
