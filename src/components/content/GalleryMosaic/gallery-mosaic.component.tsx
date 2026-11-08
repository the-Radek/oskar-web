import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Skeleton from '@mui/material/Skeleton';
import clsx from 'clsx';
import type { GalleryMosaicProps } from './gallery-mosaic.types';
import styles from './gallery-mosaic.module.css';

export default function GalleryMosaic({ images, className }: GalleryMosaicProps) {
  return (
    <ul className={clsx(styles.root, className)}>
      {images.map((image) => (
        <li
          key={image.id}
          className={styles.item}
          style={{ '--ratio': image.width / image.height } as CSSProperties}
          // lets a feed find the tiles that still wait for their image
          data-slot={'src' in image ? undefined : image.id}
        >
          {'src' in image ? (
            <Link href={`/galerie/${image.id}`} scroll={false} className={styles.link}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 600px) 60vw, 360px"
                placeholder={image.blurDataURL ? 'blur' : 'empty'}
                blurDataURL={image.blurDataURL}
              />
            </Link>
          ) : (
            <Skeleton
              variant="rectangular"
              animation="wave"
              width="100%"
              height="100%"
              className={styles.link}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
