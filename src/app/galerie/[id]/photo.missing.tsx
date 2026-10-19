'use client';
import { useRouter } from 'next/navigation';
import Typography from '@mui/material/Typography';
import OverlayBackdrop from '@/components/layout/OverlayBackdrop';

/**
 * Shown over the page when the opened photo doesn't exist; closes like the lightbox does.
 */
export default function PhotoMissing({ standalone = false }: { standalone?: boolean }) {
  const router = useRouter();
  const close = () => (standalone ? router.push('/galerie') : router.back());

  return (
    <OverlayBackdrop onClick={close}>
      <Typography color="inherit">Fotografie nenalezena.</Typography>
    </OverlayBackdrop>
  );
}
