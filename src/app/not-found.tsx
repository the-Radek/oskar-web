import Link from 'next/link';

export default function Page404() {
  return (
    <main>
      <h2>404 - Stránka nenalezena</h2>
      <p>Stránka, kterou hledáte, nebyla nalezena.</p>
      <Link href="/">Zpět na úvodní stránku.</Link>
    </main>
  );
}
