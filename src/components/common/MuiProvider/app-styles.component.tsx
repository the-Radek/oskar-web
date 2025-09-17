'use client';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';

export default function AppStyles() {
  return (
    <>
      <CssBaseline />
      <GlobalStyles
        styles={(theme) => ({
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
        })}
      />
    </>
  );
}
