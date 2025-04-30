'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#68d0ff',
      dark: '#006bb7',
      contrastText: '#fff',
    },
    background: {
      default: '#fff',
      paper: '#bae3f6',
      footer: '#83c8ef',
    },
    text: {
      primary: '#000',
      secondary: '#8cd5f7',
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;
