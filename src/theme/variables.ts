import { createTheme, Palette } from '@mui/material/styles';
import themeOptions from './default-options';

const PREFIX = 'mui';

function varsPalette(prefix: string): Palette {
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

const defaultTheme = createTheme(themeOptions);

/**
 * Theme helper for CSS variables. Available for server-side rendering.
 */
const theme = {
  ...defaultTheme,
  palette: varsPalette(PREFIX),
};

export default theme;
