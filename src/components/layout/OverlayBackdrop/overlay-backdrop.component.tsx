import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import clsx from 'clsx';
import type { OverlayBackdropProps } from './overlay-backdrop.types';
import styles from './overlay-backdrop.module.css';

/**
 * Full-screen overlay with a spinner, or with `children` instead of it.
 */
export default function OverlayBackdrop({
  label,
  children,
  className,
  ...rest
}: OverlayBackdropProps) {
  return (
    <Backdrop open className={clsx(styles.root, className)} {...rest}>
      {children ?? <CircularProgress color="inherit" aria-label={label} />}
    </Backdrop>
  );
}
