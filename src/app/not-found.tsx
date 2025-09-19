import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from './error.module.css';

export default function Page404() {
  return (
    <main>
      <Typography variant="h3" component="h2">
        Stránka nenalezena
      </Typography>
      <p>Bohužel, stránka, kterou hledáte, nebyla nalezena.</p>
      <div className={styles.actions}>
        <Button variant="outlined" component={Link} href="/" startIcon={<HomeIcon />}>
          Zpět domů
        </Button>
      </div>
    </main>
  );
}
