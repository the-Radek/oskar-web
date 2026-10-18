'use client';
import { useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Lightbox, { type Slide } from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Download from 'yet-another-react-lightbox/plugins/download';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import ViewListIcon from '@mui/icons-material/ViewList';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import type { ImageSummary } from '@/lib/actions/image';
import { formatDate } from '@/lib/utilities/format-date';
import { loadGalleryNeighbours } from './actions';

interface LightboxViewProps {
  initial: {
    /** the image to open with its neighbours, in gallery order (newest first) */
    images: ImageSummary[];
    /** index of the image to open */
    index: number;
    hasOlder: boolean;
  };
  /** Opened directly (not over the gallery): closing navigates to the gallery instead of back. */
  standalone?: boolean;
  /** the post whose images are being walked, if opened from one */
  postId?: number;
}

const PRELOAD_DISTANCE = 5;
// allowed sizes for next/image optimization
const WIDTHS = [640, 1080, 1920, 3840];
const THUMBNAIL_WIDTH = 256;

function optimized(src: string, width: number) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=75`;
}

function toSlide(image: ImageSummary): Slide {
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

export default function LightboxView({ initial, standalone = false, postId }: LightboxViewProps) {
  const router = useRouter();
  const [images, setImages] = useState(initial.images);
  const [hasOlder, setHasOlder] = useState(initial.hasOlder);
  const loading = useRef(false);
  const currentId = useRef(initial.images[initial.index].id);
  const slides = useMemo(() => images.map(toSlide), [images]);

  const close = () => (standalone ? router.push('/galerie') : router.back());

  async function onView({ index }: { index: number }) {
    const image = images[index];
    if (image.id !== currentId.current) {
      currentId.current = image.id;
      // keeps the address in sync with the slide without remounting the lightbox
      window.history.replaceState(null, '', `/galerie/${image.id}`);
    }

    if (!hasOlder || loading.current || index < images.length - PRELOAD_DISTANCE) return;

    // load the next chunk of images
    loading.current = true;
    try {
      const last = images[images.length - 1];
      const chunk = await loadGalleryNeighbours(
        { createdAt: last.createdAt, id: last.id },
        'older',
        postId,
      );
      setImages((current) => [...current, ...chunk.images]);
      setHasOlder(chunk.hasMore);
    } catch {
      // tried again on the next slide change
    } finally {
      loading.current = false;
    }
  }

  return (
    <Lightbox
      open
      close={close}
      slides={slides}
      index={initial.index}
      plugins={[Captions, Download, Fullscreen, Thumbnails, Zoom]}
      on={{ view: onView }}
      carousel={{ finite: true, preload: 3 }}
      controller={{ closeOnBackdropClick: true, closeOnPullDown: true }}
      zoom={{ maxZoomPixelRatio: 3, scrollToZoom: true }}
      thumbnails={{ width: 96, height: 64, border: 0, gap: 8, padding: 0, vignette: false }}
      captions={{ descriptionTextAlign: 'center' }}
      styles={{
        root: { backgroundColor: 'rgba(0, 0, 0, 0.78)', backdropFilter: 'blur(8px)' },
        container: { backgroundColor: 'transparent' },
        captionsDescriptionContainer: { background: 'transparent' },
        thumbnailsContainer: { background: 'transparent' },
        thumbnail: { backgroundColor: 'transparent' },
      }}
      render={{
        iconPrev: () => <ChevronLeftIcon sx={{ fontSize: 64 }} />,
        iconNext: () => <ChevronRightIcon sx={{ fontSize: 64 }} />,
        iconClose: () => <CloseIcon />,
        iconZoomIn: () => <ZoomInIcon />,
        iconZoomOut: () => <ZoomOutIcon />,
        iconEnterFullscreen: () => <FullscreenIcon />,
        iconExitFullscreen: () => <FullscreenExitIcon />,
        iconDownload: () => <DownloadIcon />,
        iconThumbnailsVisible: () => <ViewListIcon />,
        iconThumbnailsHidden: () => <ViewListIcon />,
      }}
      labels={{
        Previous: 'Předchozí',
        Next: 'Další',
        Close: 'Zavřít',
        Slide: 'Fotografie',
        Carousel: 'Fotogalerie',
        Lightbox: 'Fotografie',
        'Photo gallery': 'Fotogalerie',
        '{index} of {total}': '{index} z {total}',
        'Zoom in': 'Přiblížit',
        'Zoom out': 'Oddálit',
        'Enter Fullscreen': 'Celá obrazovka',
        'Exit Fullscreen': 'Ukončit celou obrazovku',
        Download: 'Stáhnout originál',
        Thumbnails: 'Náhledy',
        'Show thumbnails': 'Zobrazit náhledy',
        'Hide thumbnails': 'Skrýt náhledy',
        Caption: 'Popisek',
        'Show captions': 'Zobrazit popisek',
        'Hide captions': 'Skrýt popisek',
      }}
    />
  );
}
