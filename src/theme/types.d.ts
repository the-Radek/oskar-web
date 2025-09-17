import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    meta: Palette['primary'];
  }

  interface PaletteOptions {
    meta?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Fab' {
  interface FabPropsColorOverrides {
    meta: true;
  }
}
