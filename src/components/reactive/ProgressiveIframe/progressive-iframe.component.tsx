'use client';
import { useState } from 'react';
import type { ProgressiveIframeProps } from './progressive-iframe.types';
import styles from './progressive-iframe.module.css';
import clsx from 'clsx';
import IconSkeleton from '../IconSkeleton/icon-skeleton.component';

export default function ProgressiveIframe(props: ProgressiveIframeProps) {
  const { icon, className, width, height, ...rest } = props;
  const [loaded, setLoaded] = useState(false);
  const classes = clsx(styles.root, className);

  return (
    <>
      {!loaded && <IconSkeleton icon={icon} className={classes} width={width} height={height} />}
      <iframe
        onLoad={() => setLoaded(true)}
        className={classes}
        style={{ display: loaded ? 'block' : 'none' }}
        width={width}
        height={height}
        referrerPolicy="no-referrer"
        {...rest}
      />
    </>
  );
}
