import type { BackdropProps } from '@mui/material/Backdrop';

export interface OverlayBackdropProps extends Omit<BackdropProps, 'open'> {
  /** accessible name of the spinner */
  label?: string;
}
