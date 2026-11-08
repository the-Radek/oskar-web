/**
 * What the mosaic needs to reserve the space of an image before the image itself is loaded.
 */
export interface ImageLayout {
  id: number;
  width: number;
  height: number;
  /** ISO date string */
  createdAt: string;
}

/**
 * A published image as sent to the browser.
 */
export interface ImageInfo extends ImageLayout {
  src: string;
  alt: string;
}

/**
 * A gallery image with a blur placeholder, for the mosaic.
 */
export interface ImageThumb extends ImageInfo {
  blurDataURL?: string;
}

/**
 * A place in the gallery feed: the image itself, or only its layout while it isn't loaded.
 */
export type ImageSlot = ImageLayout | ImageThumb;

export interface ImageChunk<T extends ImageLayout = ImageInfo> {
  images: T[];
  hasMore: boolean;
}

/**
 * A year that has published images, and how many.
 */
export interface ImageYear {
  year: number;
  count: number;
}

/**
 * A stretch of the gallery feed (newest first) with a flag per end for more beyond it.
 */
export interface ImageSlotWindow {
  images: ImageSlot[];
  hasNewer: boolean;
  hasOlder: boolean;
}
