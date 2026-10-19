import type { ImageYear } from '@/lib/data/image/types';

export interface YearNavProps {
  year: number;
  /** all available years with images, sorted */
  years?: ImageYear[];
  /** id used for aria-label */
  labelId?: string;
  active?: boolean;
  disabled?: boolean;
  onJump?: (year: number) => void;
}
