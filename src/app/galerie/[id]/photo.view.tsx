'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Lightbox from '@/components/content/Lightbox';
import type { LightboxProps } from '@/components/content/Lightbox';
import appConfig from '../../app.config.json';
import { loadImageChunk } from './actions';
import { ImageFeedDirection } from '@/lib/validators/image-feed';
import { ImageInfo } from '@/lib/data/image/types';

interface PhotoViewProps {
  initial: LightboxProps['initial'];
  /** Opened directly (not over the gallery): closing navigates to the gallery instead of back. */
  standalone?: boolean;
  /** the post whose images are being walked, if opened from one */
  postId?: number;
}

const pageTitle = (alt: string) => appConfig.titleTemplate.replace('%s', alt);

export default function PhotoView({ initial, standalone = false, postId }: PhotoViewProps) {
  const router = useRouter();

  // The page underneath keeps its metadata on soft navigation (the router takes the head from the
  // children slot), so the title is set by hand and put back on close.
  useEffect(() => {
    const previous = document.title;
    document.title = pageTitle(initial.images[initial.index].alt);
    return () => {
      document.title = previous;
    };
  }, [initial]);

  function loadMore(direction: ImageFeedDirection, edge: ImageInfo) {
    return loadImageChunk({ createdAt: edge.createdAt, id: edge.id }, direction, postId);
  }

  function onView(image: ImageInfo) {
    window.history.replaceState(null, '', `/galerie/${image.id}`);
    document.title = pageTitle(image.alt);
  }

  const close = () => (standalone ? router.push('/galerie') : router.back());

  return <Lightbox initial={initial} onLoadMore={loadMore} onView={onView} onClose={close} />;
}
