import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import theme from '@/theme/variables';

export default function Page404() {
  return (
    <main>
      <Typography variant="h3" component="h1">
        Stránka nenalezena
      </Typography>
      <p>Bohužel, stránka, kterou hledáte, nebyla nalezena.</p>
      <Container sx={{ paddingY: theme.spacing(4), display: 'flex', justifyContent: 'center' }}>
        <Button variant="outlined" component={Link} href="/" startIcon={<HomeIcon />}>
          Zpět domů
        </Button>
      </Container>
    </main>
  );
}
