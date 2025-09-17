import { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import classicTheme from '@/theme/classic';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import theme from '@/theme/static';

export default function GlobalThemeProvider({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <InitColorSchemeScript attribute="class" />
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <ThemeProvider theme={classicTheme}>
          <CssBaseline />
          <GlobalStyles
            styles={{
              ':root': {
                '--font-weight-light': theme.typography.fontWeightLight,
                '--font-weight-regular': theme.typography.fontWeightRegular,
                '--font-weight-medium': theme.typography.fontWeightMedium,
                '--font-weight-bold': theme.typography.fontWeightBold,
              },
              body: {
                maxWidth: theme.breakpoints.values.lg,
              },
              [theme.breakpoints.up('lg')]: {
                body: {
                  borderRadius: theme.shape.borderRadius,
                  boxShadow: theme.shadows[24],
                },
                'body > header': {
                  borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
                  overflow: 'hidden',
                },
                'body > footer': {
                  borderRadius: `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`,
                },
              },
            }}
          />
          {children}
        </ThemeProvider>
      </AppRouterCacheProvider>
    </>
  );
}
