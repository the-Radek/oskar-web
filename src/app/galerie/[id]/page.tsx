import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getImage } from '@/lib/actions/image';
import { parseId } from '@/lib/utilities/parse-id';

export async function generateMetadata({ params }: PageProps<'/galerie/[id]'>): Promise<Metadata> {
  const { id } = await params;
  const image = await getImage(parseId(id));
  if (!image) notFound();
  return { title: image.alt };
}

// The grid comes from layout.tsx and the lightbox from the @modal slot's [id] variant
// (standalone, for this exact hard-navigation case); this route has nothing of its own to render.
export default function GalleryImagePage() {
  return null;
}
