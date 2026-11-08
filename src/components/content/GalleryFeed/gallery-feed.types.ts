import type { RefCallback } from 'react';
import type { ImageChunk, ImageThumb, ImageThumbWindow, ImageYear } from '@/lib/data/image/types';
import type { ChunkedWindow } from '@/lib/utilities/use-chunked-window';
import type { ImageFeedDirection } from '@/lib/validators/image-feed';

export interface GalleryFeedProps {
  initial: ImageChunk<ImageThumb>;
  /** Every year with images and its image count, newest first. */
  years: ImageYear[];
  /** Year to open the feed at instead of the newest; ignored if not listed in `years`. */
  initialYear?: number;
  /** Loads the images past the oldest (`older`) or newest (`newer`) loaded image `edge`. */
  onLoadMore: (direction: ImageFeedDirection, edge: ImageThumb) => Promise<ImageChunk<ImageThumb>>;
  /** Loads the feed from the start of `year`, with a few newer images above it. */
  onLoadYear: (year: number) => Promise<ImageThumbWindow>;
  /** Reports the year at the top of the view whenever it changes. */
  onYearChange?: (year: number) => void;
}

export interface YearGroup {
  year: number;
  images: ImageThumb[];
}

export interface SectionRegistry {
  register: (year: number) => RefCallback<HTMLElement>;
  get: (year: number) => HTMLElement | undefined;
}

export interface YearJumpOptions {
  groups: YearGroup[];
  hasNewer: boolean;
  replace: (window: ChunkedWindow<ImageThumb>) => void;
  loadYear: (year: number) => Promise<ImageThumbWindow>;
  sections: SectionRegistry;
  initialYear?: number;
}

export interface GallerySectionProps {
  year: number;
  years?: ImageYear[];
  active: boolean;
  disabled: boolean;
  sections?: SectionRegistry;
  onJump?: (year: number) => void;
  children: React.ReactNode;
}
