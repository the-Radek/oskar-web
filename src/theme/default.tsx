'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#68d0ff',
      contrastText: '#fff',
    },
    secondary: {
      main: '#83c8ef',
    },
    background: {
      default: '#fff',
      paper: '#68d0ff',
    },
    text: {
      primary: '#000',
      secondary: '#000',
    },
    divider: '#006bb7',
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;
