import Image from 'next/image';
import styles from './header.module.css';
import banner from '@/assets/img/banner-2026.jpg';

export default function Header() {
  return (
    <header className={styles.root}>
      <Image src={banner} alt="OSKAR" sizes="(max-width: 1200px) 100vw, 1200px" priority />
    </header>
  );
}
