'use client';
import { useMemo, useRef, useState } from 'react';
import YarLightbox from 'yet-another-react-lightbox';
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
import type { ImageFeedDirection } from '@/lib/validators/image-feed';
import type { LightboxProps } from './lightbox.types';
import { toSlide } from './lightbox.slide';

const PRELOAD_DISTANCE = 5;

/**
 * Lightbox over a window of an ordered (newest first) image sequence, loading more on either end
 * as the user nears it. Knows nothing about where the images come from.
 */
export default function Lightbox({ initial, onLoadMore, onView, onClose }: LightboxProps) {
  const [images, setImages] = useState(initial.images);
  const [index, setIndex] = useState(initial.index);
  const [hasMore, setHasMore] = useState({ older: initial.hasOlder, newer: initial.hasNewer });
  const loading = useRef({ older: false, newer: false });
  const currentId = useRef(initial.images[initial.index].id);
  const slides = useMemo(() => images.map(toSlide), [images]);

  async function loadMore(direction: ImageFeedDirection) {
    if (!hasMore[direction] || loading.current[direction]) return;

    loading.current[direction] = true;
    try {
      const edge = direction === 'older' ? images[images.length - 1] : images[0];
      const chunk = await onLoadMore(direction, edge);
      if (direction === 'older') {
        setImages((current) => [...current, ...chunk.images]);
      } else {
        setImages((current) => [...chunk.images, ...current]);
        // prepending shifts every slide, keep the same one in view
        setIndex((current) => current + chunk.images.length);
      }
      setHasMore((current) => ({ ...current, [direction]: chunk.hasMore }));
    } catch {
      // tried again on the next slide change
    } finally {
      loading.current[direction] = false;
    }
  }

  function handleView({ index }: { index: number }) {
    setIndex(index);
    const image = images[index];
    if (image.id !== currentId.current) {
      currentId.current = image.id;
      onView?.(image);
    }

    if (index >= images.length - PRELOAD_DISTANCE) loadMore('older');
    if (index < PRELOAD_DISTANCE) loadMore('newer');
  }

  return (
    <YarLightbox
      open
      close={onClose}
      slides={slides}
      index={index}
      plugins={[Captions, Download, Fullscreen, Thumbnails, Zoom]}
      on={{ view: handleView }}
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
