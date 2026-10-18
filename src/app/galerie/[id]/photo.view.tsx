'use client';
import { useRouter } from 'next/navigation';
import Lightbox from '@/components/content/Lightbox';
import type { LightboxProps } from '@/components/content/Lightbox';
import { loadGalleryNeighbours } from './photo.actions';

interface PhotoViewProps {
  initial: LightboxProps['initial'];
  /** Opened directly (not over the gallery): closing navigates to the gallery instead of back. */
  standalone?: boolean;
  /** the post whose images are being walked, if opened from one */
  postId?: number;
}

export default function PhotoView({ initial, standalone = false, postId }: PhotoViewProps) {
  const router = useRouter();

  return (
    <Lightbox
      initial={initial}
      onLoadMore={(direction, edge) =>
        loadGalleryNeighbours({ createdAt: edge.createdAt, id: edge.id }, direction, postId)
      }
      // keeps the address in sync with the slide without remounting the lightbox
      onView={(image) => window.history.replaceState(null, '', `/galerie/${image.id}`)}
      onClose={() => (standalone ? router.push('/galerie') : router.back())}
    />
  );
}
