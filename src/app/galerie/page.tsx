import type { Metadata } from 'next';
import metadataJson from './metadata.json';

export const metadata: Metadata = metadataJson;

// The listing lives in layout.tsx (shared with /galerie/[id]); this route has nothing of its
// own to render.
export default function GalleryIndexPage() {
  return null;
}
