import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypeBackground {
    footer: string;
  }

  interface Palette {
    meta: Palette['primary'];
  }

  interface PaletteOptions {
    meta?: PaletteOptions['primary'];
  }
}
