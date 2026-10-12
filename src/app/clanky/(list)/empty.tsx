import styles from '@/app/error.module.css';
import Surface from '@/components/layout/Surface';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';

export default function PostsEmpty() {
  return (
    <>
      <Surface variant="container">
        <p>Zatím tu nejsou žádné články.</p>
      </Surface>
      <div className={styles.actions}>
        <Button variant="outlined" component={Link} href="/" startIcon={<HomeIcon />}>
          Jít domů
        </Button>
      </div>
    </>
  );
}
