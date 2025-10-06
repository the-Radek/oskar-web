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
            '--border-radius': `${theme.shape.borderRadius}px`,
          },
          body: {
            boxShadow: theme.shadows[24],
          },
        })}
      />
    </>
  );
}
