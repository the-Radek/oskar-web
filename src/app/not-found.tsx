import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from './error.module.css';
import Surface from '@/components/content/Surface';

export default function Page404() {
  return (
    <main>
      <Surface component="section" variant="container">
        <Typography variant="h3" component="h2">
          Stránka nenalezena
        </Typography>
        <p>Kam pak? Tady nic není.</p>
      </Surface>
      <div className={styles.actions}>
        <Button variant="outlined" component={Link} href="/" startIcon={<HomeIcon />}>
          Zpět domů
        </Button>
      </div>
    </main>
  );
}
