'use client';
import YearNav from '@/components/navigation/YearNav';
import type { GallerySectionProps } from './gallery-feed.types';
import styles from './gallery-feed.module.css';

export default function GallerySection({
  year,
  years,
  active,
  disabled,
  sections,
  onJump,
  children,
}: GallerySectionProps) {
  const labelId = `gallery-year-${year}`;

  return (
    <section ref={sections?.register(year)} className={styles.section} aria-labelledby={labelId}>
      <YearNav
        year={year}
        years={years}
        labelId={labelId}
        active={active}
        disabled={disabled}
        onJump={onJump}
      />
      {children}
    </section>
  );
}
