import type { RefCallback } from 'react';
import type {
  ImageChunk,
  ImageLayout,
  ImageSlot,
  ImageSlotWindow,
  ImageThumb,
  ImageYear,
} from '@/lib/data/image/types';
import type { ChunkedWindow } from '@/lib/utilities/use-chunked-window';

export interface GalleryFeedProps {
  initial: ImageChunk<ImageThumb>;
  /** Every year with images and its image count, newest first. */
  years: ImageYear[];
  /** Year to open the feed at instead of the newest; ignored if not listed in `years`. */
  initialYear?: number;
  /** Loads the images past the oldest loaded image `edge`. */
  onLoadOlder: (edge: ImageSlot) => Promise<ImageChunk<ImageThumb>>;
  /** Loads the layout of the whole nearest year newer than the newest loaded image `edge`. */
  onLoadNewer: (edge: ImageSlot) => Promise<ImageChunk<ImageLayout>>;
  /** Loads the images of some of the tiles that are still empty. */
  onLoadThumbs: (ids: number[]) => Promise<ImageThumb[]>;
  /** Loads the feed from the start of `year`, the whole year as layout. */
  onLoadYear: (year: number) => Promise<ImageSlotWindow>;
  /** Reports the year at the top of the view whenever it changes. */
  onYearChange?: (year: number) => void;
}

export interface YearGroup {
  year: number;
  images: ImageSlot[];
}

export interface SectionRegistry {
  register: (year: number) => RefCallback<HTMLElement>;
  get: (year: number) => HTMLElement | undefined;
}

export interface YearJumpOptions {
  groups: YearGroup[];
  replace: (window: ChunkedWindow<ImageSlot>) => void;
  loadYear: (year: number) => Promise<ImageSlotWindow>;
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
