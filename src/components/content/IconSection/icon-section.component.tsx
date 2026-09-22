import Image from 'next/image';
import Typography from '@mui/material/Typography';
import type { IconSectionProps } from './icon-section.types';
import styles from './icon-section.module.css';

export default function IconSection({ icon, alt, label, title, children }: IconSectionProps) {
  return (
    <section aria-label={label}>
      <Image src={icon} alt={alt} sizes="80px" className={styles.icon} />
      <Typography variant="h3" color="inherit" gutterBottom={false}>
        {title}
      </Typography>
      <Typography align="justify">{children}</Typography>
    </section>
  );
}
