import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import '@/styles/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Tábor oskar',
  description:
    'Letní tábor Oskar nabízí dobrodružství, hry a zábavu v krásné přírodě u Rokycan pro děti všech věkových kategorií. Každé léto pořádáme několik turnusů s pestrým programem.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const year = new Date().getFullYear();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header>
          <nav>
            <ul>
              <li>
                <Link href="/">Úvodní stránka</Link>
              </li>
              <li>
                <Link href="/taborova-hra">Celotáborová hra</Link>
              </li>
              <li>
                <Link href="/turnusy">Turnusy</Link>
              </li>
              <li>
                <Link href="/o-tabore">O táboře</Link>
              </li>
              <li>
                <Link href="/galerie">Galerie</Link>
              </li>
              <li>
                <Link href="/kontakty">Kontakty</Link>
              </li>
            </ul>
          </nav>
          <Image
            src="/banner-2025.jpg"
            width={4724}
            height={768}
            alt="OSKAR"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        </header>
        <div>
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSfEIT4bl2GNx_M8fPmkToFuHEzBQ3a5OyF55v42VP4Y5cJvIA/viewform?fbclid=IwZXh0bgNhZW0CMTEAAR0i5LYQyHo2gWgMWiDFs6KlrdftrphopB9TR4996RAIX0hzgjSCdS9t8V4_aem_rkTRc9BnWRpgh-x3tR58ZQ"
            target="_blank"
          >
            Podat přihlášku
          </Link>
        </div>
        {children}
        <footer>
          <p>© {year} Přátelé LDT Oskar, z.s. Všechna práva vyhrazena.</p>
          <div>
            <Link href="https://www.facebook.com/taborOskar.cz"></Link>
            <Link href="https://www.instagram.com/tabor_oskar/"></Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
