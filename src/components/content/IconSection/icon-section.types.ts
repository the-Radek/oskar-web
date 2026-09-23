import type { StaticImageData } from 'next/image';
import type { ReactNode } from 'react';

export interface IconSectionProps {
  icon: StaticImageData;
  alt: string;
  label: string;
  title: string;
  children: ReactNode;
}
