'use client';
import { useRouter } from 'next/navigation';
import Typography from '@mui/material/Typography';
import OverlayBackdrop from '@/components/layout/OverlayBackdrop';

// Generic fallback for the modal slot; routes with their own not-found.tsx take precedence.
export default function ModalNotFound() {
  const router = useRouter();
  const close = () => (window.history.length > 1 ? router.back() : router.push('/'));

  return (
    <OverlayBackdrop onClick={close}>
      <Typography color="inherit">Nenalezeno.</Typography>
    </OverlayBackdrop>
  );
}
