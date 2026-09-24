import { Metadata } from 'next';
import metadataJson from './metadata.json';

export const metadata: Metadata = metadataJson;

export default function GalleryPage() {
  return <div>galerie works!</div>;
}
