import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import type { LoadingBackdropProps } from './loading-backdrop.types';

export default function LoadingBackdrop({ label }: LoadingBackdropProps) {
  return (
    <Backdrop open sx={{ zIndex: 'modal' }}>
      <CircularProgress color="inherit" aria-label={label} />
    </Backdrop>
  );
}
