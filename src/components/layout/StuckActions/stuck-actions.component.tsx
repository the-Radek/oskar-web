import Link from 'next/link';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import GoBackButton from '@/components/navigation/GoBackButton';
import type { StuckActionsProps } from './stuck-actions.types';
import styles from './stuck-actions.module.css';

const DEFAULT_CHILDREN = (
  <>
    <GoBackButton variant="contained">Vrátit se zpět</GoBackButton>
    <Button variant="outlined" component={Link} href="/" startIcon={<HomeIcon />}>
      Jít domů
    </Button>
  </>
);

export default function StuckActions({ children = DEFAULT_CHILDREN }: StuckActionsProps) {
  return <div className={styles.root}>{children}</div>;
}
