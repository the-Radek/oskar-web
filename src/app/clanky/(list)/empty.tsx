import Typography from '@mui/material/Typography';
import styles from '@/app/error.module.css';
import Surface from '@/components/layout/Surface';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';

export default function PostsEmptyPage() {
  return (
    <main>
      <Surface component="section" variant="container">
        <Typography variant="h3" component="h1">
          Články
        </Typography>
        <p>Zatím tu nejsou žádné články.</p>
      </Surface>
      <div className={styles.actions}>
        <Button variant="outlined" component={Link} href="/" startIcon={<HomeIcon />}>
          Jít domů
        </Button>
      </div>
    </main>
  );
}
