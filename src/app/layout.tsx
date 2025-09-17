import type { Metadata } from 'next';
import type { Viewport } from 'next';
import { Geist } from 'next/font/google';
import Footer from '@/components/common/footer';
import Header from '@/components/common/header';
import GlobalThemeProvider, { themeColor } from '@/components/common/global-theme-provider';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Tábor Oskar',
    default: 'Tábor Oskar',
  },
  description:
    'Letní tábor Oskar nabízí dobrodružství, hry a zábavu v krásné přírodě u Rokycan pro děti všech věkových kategorií. Každé léto pořádáme několik turnusů s pestrým programem.',
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
  themeColor: themeColor,
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
        <GlobalThemeProvider>
          <Header />
          {children}
          <Footer />
        </GlobalThemeProvider>
      </body>
    </html>
  );
}
