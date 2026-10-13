import { Suspense } from 'react';
import LoadingBackdrop from '@/components/progressive/LoadingBackdrop';
import LightboxPhoto from './photo';
import type { LightboxProps } from './lightbox.types';

/**
 * Renders immediately (no awaiting here, not even `params`) so the backdrop shows up instantly;
 * the actual fetch happens in `Photo`, behind this Suspense boundary.
 */
export default function Lightbox({ params, standalone }: LightboxProps) {
  return (
    <Suspense fallback={<LoadingBackdrop label="Načítání fotografie" />}>
      <LightboxPhoto params={params} standalone={standalone} />
    </Suspense>
  );
}
