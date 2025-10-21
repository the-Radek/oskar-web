import { Metadata } from 'next';
import metadataJson from './metadata.json';

export const metadata: Metadata = metadataJson;

export default function Application() {
  return <div>prihlaska works!</div>;
}
