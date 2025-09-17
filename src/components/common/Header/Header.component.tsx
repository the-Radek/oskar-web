import Image from 'next/image';
import MobileNav from '@/components/navigation/MobileNav';
import DesktopNav from '@/components/navigation/DesktopNav';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.root}>
      <MobileNav className={styles.mobileNav} />
      <DesktopNav className={styles.desktopNav} />
      <Image
        src="/banner-2025.jpg"
        width={4724}
        height={768}
        alt="OSKAR"
        sizes="(max-width: 1280px) 100vw, 1280px"
        priority
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </header>
  );
}
