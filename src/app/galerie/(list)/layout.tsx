import Typography from '@mui/material/Typography';

export default function GalleryLayout({ children }: LayoutProps<'/taborova-hra'>) {
  return (
    <main>
      <Typography variant="h2">Galerie</Typography>
      {children}
    </main>
  );
}
