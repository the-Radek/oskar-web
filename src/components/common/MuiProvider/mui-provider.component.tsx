import { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import AppStyles from './app-styles.component';
import theme from '@/theme/classic';

export default function GlobalThemeProvider({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <InitColorSchemeScript attribute="class" />
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <ThemeProvider theme={theme}>
          <AppStyles />
          {children}
        </ThemeProvider>
      </AppRouterCacheProvider>
    </>
  );
}
