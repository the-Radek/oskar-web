import type { CSSProperties } from 'react';
import Skeleton from '@mui/material/Skeleton';
import clsx from 'clsx';
import styles from './gallery-mosaic.module.css';

const RATIOS = [1.5, 0.75, 1.33, 1.78, 0.67, 1.5, 1, 1.33, 0.8, 1.6, 1.25, 0.9];

export function GalleryMosaicSkeleton({ count, className }: { count: number; className?: string }) {
  return (
    <div
      className={clsx(styles.root, className)}
      role="status"
      aria-label="Načítání fotografií"
      aria-busy="true"
    >
      {Array.from({ length: count }, (_, index) => (
        <Skeleton
          key={index}
          variant="rounded"
          className={styles.item}
          style={{ '--ratio': RATIOS[index % RATIOS.length], height: 'auto' } as CSSProperties}
        />
      ))}
    </div>
  );
}
