import type { ImageThumb } from '@/lib/data/image/types';

export interface YearGroup {
  year: number;
  images: ImageThumb[];
}

/**
 * Splits images (already ordered newest first) into consecutive runs of the same UTC year.
 */
export function groupByYear(images: ImageThumb[]) {
  const groups: YearGroup[] = [];
  for (const image of images) {
    const year = new Date(image.createdAt).getUTCFullYear();
    const last = groups.at(-1);
    if (last?.year === year) last.images.push(image);
    else groups.push({ year, images: [image] });
  }
  return groups;
}
