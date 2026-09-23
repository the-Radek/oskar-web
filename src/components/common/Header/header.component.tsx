import Image from 'next/image';
import MobileNav from '@/components/navigation/MobileNav';
import DesktopNav from '@/components/navigation/DesktopNav';
import styles from './header.module.css';
import banner from '@/assets/img/banner-2026.jpg';
import ShowIf from '@/components/layout/ShowIf';

export default function Header() {
  return (
    <>
      <ShowIf below="md">
        <MobileNav />
      </ShowIf>
      <header className={styles.root}>
        <ShowIf above="md">
          <DesktopNav />
        </ShowIf>
        <Image src={banner} alt="OSKAR" sizes="(max-width: 1200px) 100vw, 1200px" priority />
      </header>
    </>
  );
}
