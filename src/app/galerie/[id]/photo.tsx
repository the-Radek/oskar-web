import { Suspense } from 'react';
import { headers } from 'next/headers';
import OverlayBackdrop from '@/components/layout/OverlayBackdrop';
import { getImage, isImageInPost } from '@/lib/data/image/image';
import { getImageWindow } from '@/lib/data/image/images';
import { parseId } from '@/lib/utilities/parse-id';
import { postIdFromPath } from '@/lib/utilities/post-id-from-path';
import { LIGHTBOX_CHUNK } from '../constants';
import PhotoMissing from './photo.missing';
import PhotoView from './photo.view';

interface PhotoProps {
  params: Promise<{ id: string }>;
  /** Opened directly (not over the gallery): closing navigates to the gallery instead of back,
   * and a missing image is a real 404 instead of an inline message. */
  standalone?: boolean;
}

async function PhotoLoader({ params, standalone = false }: PhotoProps) {
  const { id } = await params;
  const imageId = parseId(id);
  if (imageId === null) return null;

  const image = imageId !== null && (await getImage(imageId));
  if (!image) return <PhotoMissing standalone={standalone} />;

  // soft navigation from a post: walk that post's images instead of the whole gallery
  const origin = standalone ? undefined : postIdFromPath((await headers()).get('next-url'));
  const postId = origin && (await isImageInPost(image.id, origin)) ? origin : undefined;

  const initial = await getImageWindow(image, LIGHTBOX_CHUNK, postId);
  return <PhotoView initial={initial} standalone={standalone} postId={postId} />;
}

/**
 * Renders immediately (no awaiting here, not even `params`) so the backdrop shows up instantly;
 * the actual fetch happens in `PhotoLoader`, behind this Suspense boundary.
 */
export default function Photo({ params, standalone }: PhotoProps) {
  return (
    <Suspense fallback={<OverlayBackdrop label="Načítání fotografie" />}>
      <PhotoLoader params={params} standalone={standalone} />
    </Suspense>
  );
}
