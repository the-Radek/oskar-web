import type { Metadata } from 'next';
import type { Viewport } from 'next';
import { Geist } from 'next/font/google';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import Footer from '@/components/common/footer.component';
import Header from '@/components/common/header.component';
import GlobalTheme from '@/components/common/global-theme.component';
import theme from '@/theme/default';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tábor Oskar',
  description:
    'Letní tábor Oskar nabízí dobrodružství, hry a zábavu v krásné přírodě u Rokycan pro děti všech věkových kategorií. Každé léto pořádáme několik turnusů s pestrým programem.',
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
  themeColor: '#68d0ff',
};

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={geist.variable}>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <GlobalTheme />
            <Header />
            <Container className="grow">
              {/* <Button
              color="secondary"
              component={Link}
              target="_blank"
              href="https://docs.google.com/forms/d/e/1FAIpQLSfEIT4bl2GNx_M8fPmkToFuHEzBQ3a5OyF55v42VP4Y5cJvIA/viewform?fbclid=IwZXh0bgNhZW0CMTEAAR0i5LYQyHo2gWgMWiDFs6KlrdftrphopB9TR4996RAIX0hzgjSCdS9t8V4_aem_rkTRc9BnWRpgh-x3tR58ZQ"
            >
              Podat přihlášku
            </Button> */}
              {children}
            </Container>
            <Footer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
