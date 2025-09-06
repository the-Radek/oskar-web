import type { Metadata } from 'next';
import type { Viewport } from 'next';
import { Geist } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import Footer from '@/components/common/footer.component';
import Header from '@/components/common/header.component';
import GlobalTheme from '@/components/common/global-theme.component';
import theme from '@/theme/classic';
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
    <html lang="cs" className={geist.variable} suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <GlobalTheme />
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
