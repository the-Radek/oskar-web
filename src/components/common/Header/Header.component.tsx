import Image from 'next/image';
import MobileNav from '@/components/navigation/MobileNav';
import DesktopNav from '@/components/navigation/DesktopNav';
import styles from './header.module.css';
import banner from '@/assets/img/banner.jpg';

export default function Header() {
  return (
    <header className={styles.root}>
      <MobileNav className={styles.mobile} />
      <DesktopNav className={styles.desktop} />
      <Image src={banner} alt="OSKAR" sizes="(max-width: 1200px) 100vw, 1200px" priority />
    </header>
  );
}
