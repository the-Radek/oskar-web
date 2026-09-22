import type { StaticImageData } from 'next/image';

export interface OskarCardProps {
  title: string;
  dateRange: string;
  text: string;
  price: string;
  image: StaticImageData;
  imageAlt: string;
}
