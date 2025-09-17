'use client';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useEffect } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import RefreshIcon from '@mui/icons-material/Refresh';
import Container from '@mui/material/Container';
import theme from '@/theme/static';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main>
      <Typography variant="h3" component="h1">
        Došlo k chybě
      </Typography>
      <p>Jajks! Něco se nepodařilo.</p>
      <Container
        sx={{
          paddingY: theme.spacing(4),
          display: 'flex',
          justifyContent: 'center',
          gap: theme.spacing(2),
        }}
      >
        <Button variant="contained" onClick={() => reset()} startIcon={<RefreshIcon />}>
          Zkusit znovu
        </Button>
        <Button variant="outlined" component={Link} href="/" startIcon={<HomeIcon />}>
          Zpět domů
        </Button>
      </Container>
    </main>
  );
}
