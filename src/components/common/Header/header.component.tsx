'use client';
import Image from 'next/image';
import MobileNav from '@/components/navigation/MobileNav';
import DesktopNav from '@/components/navigation/DesktopNav';
import styles from './header.module.css';
import banner from '@/assets/img/banner.jpg';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Header() {
  const isMobile = useMediaQuery('(max-width: 900px)');

  return (
    <>
      {isMobile && <MobileNav className={styles.mobile} />}
      <header className={styles.root}>
        {!isMobile && <DesktopNav className={styles.desktop} />}
        <Image src={banner} alt="OSKAR" sizes="(max-width: 1200px) 100vw, 1200px" priority />
      </header>
    </>
  );
}
