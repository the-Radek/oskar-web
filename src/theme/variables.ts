import { createTheme, Palette } from '@mui/material/styles';

const PREFIX = 'mui';

function fakePalette(prefix: string): Palette {
  const colorHandler: ProxyHandler<{ prefix: string; parent: string | symbol }> = {
    get(target, prop: string | symbol) {
      return `var(--${target.prefix}-palette-${String(target.parent)}-${String(prop)})`;
    },
  };

  const paletteHandler: ProxyHandler<{ prefix: string }> = {
    get(target, prop: string | symbol) {
      return new Proxy({ prefix: target.prefix, parent: prop }, colorHandler);
    },
  };

  return new Proxy({ prefix }, paletteHandler) as unknown as Palette;
}

/**
 * Theme helper for CSS variables.
 */
const theme = {
  ...createTheme({
    cssVariables: {
      colorSchemeSelector: 'class',
    },
  }),
  palette: fakePalette(PREFIX),
  spacing: (factor: number) => `calc(${factor} * var(--${PREFIX}-spacing));`,
};

export default theme;
