import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import theme from '@/theme/variables';

export default function GlobalTheme() {
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
          main: {
            flexGrow: 1,
            padding: `${theme.spacing(6)} ${theme.spacing(4)}`,
          },
          [theme.breakpoints.up('lg')]: {
            body: {
              borderRadius: theme.shape.borderRadius,
              boxShadow: theme.shadows[24],
              overflow: 'hidden',
            },
            'body > header': {
              borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
              overflow: 'hidden',
            },
            'body > footer': {
              borderRadius: `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`,
              overflow: 'hidden',
            },
          },
        }}
      />
    </>
  );
}
