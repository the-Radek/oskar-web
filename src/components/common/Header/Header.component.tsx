import Image from 'next/image';
import MobileNav from '@/components/navigation/MobileNav';
import DesktopNav from '@/components/navigation/DesktopNav';
import styles from './header.module.css';

export default function Header() {
  return (
    <header className={styles.root}>
      <MobileNav className={styles.mobile} />
      <DesktopNav className={styles.desktop} />
      <Image
        src="/image/banner-2025.jpg"
        width={4724}
        height={768}
        alt="OSKAR"
        sizes="(max-width: 1200px) 100vw, 1200px"
        priority
      />
    </header>
  );
}
