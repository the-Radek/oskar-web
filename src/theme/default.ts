'use client';
import { alpha, createTheme, getContrastRatio } from '@mui/material/styles';

function augmentColor(color: string) {
  return {
    main: color,
    light: alpha(color, 0.5),
    dark: alpha(color, 0.9),
    contrastText: getContrastRatio(color, '#fff') > 4.5 ? '#fff' : '#111',
  };
}

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  typography: {
    fontFamily: 'var(--font-geist)',
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#68d0ff',
      // dark: '#006bb7',
      contrastText: '#fff',
    },
    secondary: {
      main: '#83c8ef',
      contrastText: '#fff',
    },
    meta: augmentColor('#3b5998'),
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
