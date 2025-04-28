'use client';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { useTheme } from '@mui/material/styles';
import defaultTheme from '@/theme/default';

export default function GlobalTheme({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = useTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            color: theme.palette.text.primary,
            background: theme.palette.background.default,
            borderRadius: theme.shape.borderRadius,
            boxShadow: `
              -8px 8px 16px ${theme.palette.divider},
              8px -8px 16px ${theme.palette.background.default}
            `,
          },
        }}
      />
      {children}
    </ThemeProvider>
  );
}
