'use client';
import { createTheme } from '@mui/material/styles';
import themeOptions from './default-options';
import { alpha, getContrastRatio } from '@mui/material/styles';

function augmentColor(color: string) {
  return {
    main: color,
    light: alpha(color, 0.5),
    dark: alpha(color, 0.9),
    contrastText: getContrastRatio(color, '#fff') > 4.5 ? '#fff' : '#000',
  };
}

export const THEME_COLOR = '#1c9dd7';

const theme = createTheme({
  ...themeOptions,
  typography: {
    ...themeOptions?.typography,
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.25,
      marginTop: '0.25em',
      marginBottom: '0.25em',
      color: THEME_COLOR,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
      marginTop: '0.25em',
      marginBottom: '0.25em',
      color: THEME_COLOR,
    },
    h3: {
      fontSize: '1.3rem',
      fontWeight: 600,
      lineHeight: 1.35,
      marginTop: '0.3em',
      marginBottom: '0.3em',
      color: THEME_COLOR,
    },
    h4: {
      fontSize: '1.2rem',
      fontWeight: 500,
      lineHeight: 1.4,
      marginTop: '0.33em',
      marginBottom: '0.33em',
    },
    h5: {
      fontSize: '1.1rem',
      fontWeight: 500,
      lineHeight: 1.7,
      marginTop: '0.37em',
      marginBottom: '0.37em',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.75,
      marginTop: '0.4em',
      marginBottom: '0.4em',
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: THEME_COLOR,
      contrastText: '#fff',
    },
    secondary: {
      main: '#83c8ef',
      contrastText: '#000',
    },
    meta: augmentColor('#3b5998'),
    background: {
      default: '#fff',
      paper: '#bae3f6',
    },
    text: {
      primary: '#000',
      secondary: '#8cd5f7',
    },
  },
});

export default theme;
