/**
 * A published image as sent to the browser.
 */
export interface ImageInfo {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
  /** ISO date string */
  createdAt: string;
}

/**
 * A gallery image with a blur placeholder, for the mosaic.
 */
export interface ImageThumb extends ImageInfo {
  blurDataURL?: string;
}

export interface ImageChunk<T extends ImageInfo = ImageInfo> {
  images: T[];
  hasMore: boolean;
}
