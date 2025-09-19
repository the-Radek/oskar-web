import { createTheme } from '@mui/material/styles';

const themeOptions: Parameters<typeof createTheme>[0] = {
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  typography: {
    fontFamily: 'var(--font-geist)',
  },
};

export default themeOptions;
