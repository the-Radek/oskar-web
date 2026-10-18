import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import clsx from 'clsx';
import type { LoadingBackdropProps } from './loading-backdrop.types';
import styles from './loading-backdrop.module.css';

/**
 * Full-screen overlay with a spinner, or with `children` instead of it.
 */
export default function LoadingBackdrop({
  label,
  children,
  className,
  ...rest
}: LoadingBackdropProps) {
  return (
    <Backdrop open className={clsx(styles.root, className)} {...rest}>
      {children ?? <CircularProgress color="inherit" aria-label={label} />}
    </Backdrop>
  );
}
