import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GalleryLightbox from '@/components/content/GalleryLightbox';
import { getImage, getImageWindow } from '@/lib/actions/image';
import { parseId } from '@/lib/utilities/parse-id';
import { LIGHTBOX_CHUNK } from '../constants';
import GalleryPage from '../(list)/page';

export async function generateMetadata({ params }: PageProps<'/galerie/[id]'>): Promise<Metadata> {
  const { id } = await params;
  const image = await getImage(parseId(id));
  if (!image) notFound();
  return { title: image.alt };
}

/**
 * Direct visit of an image address: the gallery with the lightbox opened over it.
 */
export default async function GalleryImagePage({ params }: PageProps<'/galerie/[id]'>) {
  const { id } = await params;
  const image = await getImage(parseId(id));
  if (!image) notFound();

  const initial = await getImageWindow(image, LIGHTBOX_CHUNK);
  return (
    <>
      <GalleryPage />
      <GalleryLightbox initial={initial} standalone />
    </>
  );
}
