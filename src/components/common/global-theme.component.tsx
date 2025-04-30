'use client';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { useTheme } from '@mui/material/styles';

function Wrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

export default function GlobalTheme() {
  const theme = useTheme();

  return (
    <Wrapper>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            color: theme.palette.text.primary,
            background: theme.palette.background.default,
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[24],
          },
          header: {
            borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
          },
          footer: {
            borderRadius: `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`,
          },
        }}
      />
    </Wrapper>
  );
}
