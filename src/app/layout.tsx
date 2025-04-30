import type { Metadata } from 'next';
import type { Viewport } from 'next';
import '@/styles/globals.css';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Footer from '@/components/common/footer.component';
import Header from '@/components/common/header.component';
import Container from '@mui/material/Container';
import GlobalTheme from '@/components/common/global-theme.component';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme/default';

export const metadata: Metadata = {
  title: 'Tábor oskar',
  description:
    'Letní tábor Oskar nabízí dobrodružství, hry a zábavu v krásné přírodě u Rokycan pro děti všech věkových kategorií. Každé léto pořádáme několik turnusů s pestrým programem.',
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
  themeColor: '#68d0ff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body>
        <ThemeProvider theme={theme}>
          <GlobalTheme />
          <Header />
          <Container className="grow">
            <Button
              color="secondary"
              component={Link}
              target="_blank"
              href="https://docs.google.com/forms/d/e/1FAIpQLSfEIT4bl2GNx_M8fPmkToFuHEzBQ3a5OyF55v42VP4Y5cJvIA/viewform?fbclid=IwZXh0bgNhZW0CMTEAAR0i5LYQyHo2gWgMWiDFs6KlrdftrphopB9TR4996RAIX0hzgjSCdS9t8V4_aem_rkTRc9BnWRpgh-x3tR58ZQ"
            >
              Podat přihlášku
            </Button>
            {children}
          </Container>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
