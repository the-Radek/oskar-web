import type { Metadata } from 'next';
import Typography from '@mui/material/Typography';
import metadataJson from './metadata.json';

export const metadata: Metadata = metadataJson;

export default function GalleryLayout({ children }: LayoutProps<'/taborova-hra'>) {
  return (
    <main>
      <Typography variant="h2">Galerie</Typography>
      {children}
    </main>
  );
}
