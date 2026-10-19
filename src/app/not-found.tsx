import Typography from '@mui/material/Typography';
import Surface from '@/components/layout/Surface';
import StuckActions from '@/components/layout/StuckActions';

export default function NotFoundPage() {
  return (
    <main>
      <Surface component="section" variant="container">
        <Typography variant="h3" component="h2">
          Stránka nenalezena
        </Typography>
        <p>Kam pak? Tady nic není.</p>
      </Surface>
      <StuckActions />
    </main>
  );
}
