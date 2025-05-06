'use client';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { useTheme } from '@mui/material/styles';

export default function GlobalTheme() {
  const theme = useTheme();

  return (
    <>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            display: 'flex',
            flexDirection: 'column',
            maxWidth: theme.breakpoints.values.lg,
            minHeight: '100vh',
            margin: '0 auto',
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
          },
          [theme.breakpoints.up('lg')]: {
            body: {
              borderRadius: theme.shape.borderRadius,
              boxShadow: theme.shadows[24],
            },
            header: {
              borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
            },
            footer: {
              borderRadius: `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`,
            },
          },
        }}
      />
    </>
  );
}
