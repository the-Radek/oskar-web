'use client';
import { useState } from 'react';
import type { ProgressiveIframeProps } from './progressive-iframe.types';
import styles from './progressive-iframe.module.css';
import clsx from 'clsx';
import IconSkeleton from '../IconSkeleton/';
import OpenNew from '@/components/navigation/OpenNew';

export default function ProgressiveIframe(props: ProgressiveIframeProps) {
  const { icon, className, width, height, src, ...rest } = props;
  const [loaded, setLoaded] = useState(false);
  const classes = clsx(styles.root, className);
  const skeleton = <IconSkeleton icon={icon} className={classes} width={width} height={height} />;

  return (
    <>
      {!loaded &&
        (src ? (
          <OpenNew href={src} tooltip={false}>
            {skeleton}
          </OpenNew>
        ) : (
          skeleton
        ))}
      <iframe
        onLoad={() => setLoaded(true)}
        className={classes}
        style={{ display: loaded ? 'block' : 'none' }}
        width={width}
        height={height}
        referrerPolicy="no-referrer"
        src={src}
        {...rest}
      />
    </>
  );
}
