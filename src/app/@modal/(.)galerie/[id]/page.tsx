import { notFound } from 'next/navigation';
import GalleryLightbox from '@/components/content/GalleryLightbox';
import { getImage, getImageWindow } from '@/lib/actions/image';
import { parseId } from '@/lib/utilities/parse-id';
import { LIGHTBOX_CHUNK } from '@/app/galerie/constants';

export default async function ImageModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const image = await getImage(parseId(id));
  if (!image) notFound();

  const initial = await getImageWindow(image, LIGHTBOX_CHUNK);
  return <GalleryLightbox initial={initial} />;
}
