import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function ImageModalLoading() {
  return (
    <Backdrop open sx={{ zIndex: 'modal' }}>
      <CircularProgress color="inherit" aria-label="Načítání fotografie" />
    </Backdrop>
  );
}
