import type { Slide } from 'yet-another-react-lightbox';
import type { ImageSummary } from '@/lib/actions/image';
import { formatDate } from '@/lib/utilities/format-date';

// allowed sizes for next/image optimization
const WIDTHS = [640, 1080, 1920, 3840];
const THUMBNAIL_WIDTH = 256;

function optimized(src: string, width: number) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=75`;
}

export function toSlide(image: ImageSummary): Slide {
  // getting larger width without height doesn't actually upscale the image
  const larger = WIDTHS.find((width) => width >= image.width) ?? WIDTHS[WIDTHS.length - 1];
  const widths = [...WIDTHS.filter((width) => width < image.width), larger];

  return {
    src: optimized(image.src, larger),
    alt: image.alt,
    width: image.width,
    height: image.height,
    srcSet: widths.map((width) => ({
      src: optimized(image.src, width),
      width,
      height: Math.round((width * image.height) / image.width),
    })),
    thumbnail: optimized(image.src, THUMBNAIL_WIDTH),
    title: image.alt,
    description: formatDate(new Date(image.createdAt)),
    download: image.src,
  };
}
