'use client';
import { useRouter } from 'next/navigation';
import Typography from '@mui/material/Typography';
import LoadingBackdrop from '@/components/progressive/LoadingBackdrop';

/**
 * Shown over the page when the opened photo doesn't exist; closes like the lightbox does.
 */
export default function PhotoMissing({ standalone = false }: { standalone?: boolean }) {
  const router = useRouter();
  const close = () => (standalone ? router.push('/galerie') : router.back());

  return (
    <LoadingBackdrop onClick={close}>
      <Typography color="inherit">Fotografie nenalezena.</Typography>
    </LoadingBackdrop>
  );
}
