import { Metadata } from 'next';
import metadataJson from './metadata.json';

export const metadata: Metadata = metadataJson;

export default function Gallery() {
  return <div>galerie works!</div>;
}
