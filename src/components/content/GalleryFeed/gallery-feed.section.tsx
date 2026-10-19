'use client';
import YearNav from '@/components/navigation/YearNav';
import type { ImageYear } from '@/lib/data/image/types';
import type { SectionRegistry } from './gallery-feed.hooks';
import styles from './gallery-feed.module.css';

interface GallerySectionProps {
  year: number;
  years?: ImageYear[];
  active: boolean;
  disabled: boolean;
  sections?: SectionRegistry;
  onJump?: (year: number) => void;
  children: React.ReactNode;
}

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
