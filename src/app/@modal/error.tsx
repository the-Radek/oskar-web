'use client';
import { startTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import OverlayBackdrop from '@/components/layout/OverlayBackdrop';
import StuckActions from '@/components/layout/StuckActions';
import RefreshIcon from '@mui/icons-material/Refresh';
import Typography from '@mui/material/Typography';

export default function ModalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  function retry(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    startTransition(() => {
      router.refresh();
      reset();
    });
  }

  const close = () => (window.history.length > 1 ? router.back() : router.push('/'));

  return (
    <OverlayBackdrop onClick={close}>
      <Typography>Upsík dupsík! Něco se nepodařilo.</Typography>
      <StuckActions>
        <Button variant="contained" onClick={(event) => retry(event)} startIcon={<RefreshIcon />}>
          Zkusit znovu
        </Button>
      </StuckActions>
    </OverlayBackdrop>
  );
}
