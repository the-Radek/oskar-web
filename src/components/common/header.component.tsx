import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
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
        priority
      />
    </header>
  );
}
