'use client';
import { useRouter } from 'next/navigation';
import Typography from '@mui/material/Typography';
import OverlayBackdrop from '@/components/layout/OverlayBackdrop';

interface PhotoNotFoundProps {
  /** Opened directly (not over the gallery): closing navigates to the gallery instead of back. */
  standalone?: boolean;
}

export default function PhotoNotFound({ standalone = false }: PhotoNotFoundProps) {
  const router = useRouter();
  const close = () => (standalone ? router.push('/galerie') : router.back());

  return (
    <OverlayBackdrop onClick={close}>
      <Typography color="inherit">Fotografie nenalezena.</Typography>
    </OverlayBackdrop>
  );
}
