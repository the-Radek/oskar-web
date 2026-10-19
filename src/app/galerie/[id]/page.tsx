import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getImage } from '@/lib/data/image/image';
import { parseId } from '@/lib/utilities/parse-id';

export async function generateMetadata({ params }: PageProps<'/galerie/[id]'>): Promise<Metadata> {
  const { id } = await params;
  const imageId = parseId(id);
  const image = imageId && (await getImage(imageId));
  if (!image) return { title: 'Chybějící obrázek' };
  return { title: image.alt };
}

// The grid comes from layout.tsx and the lightbox from the @modal slot's [id] variant
// (standalone, for this exact hard-navigation case); this route handles 404, but renders nothing
export default async function GalleryImagePage({ params }: PageProps<'/galerie/[id]'>) {
  const { id } = await params;
  if (!parseId(id)) notFound();
  return null;
}
