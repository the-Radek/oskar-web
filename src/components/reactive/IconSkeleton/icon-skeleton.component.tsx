import type { IconSkeletonProps } from './icon-skeleton.types';
import styles from './icon-skeleton.module.css';
import Skeleton from '@mui/material/Skeleton';
import { cloneElement } from 'react';

export default function IconSkeleton(props: IconSkeletonProps) {
  const { icon, ...rest } = props;

  return (
    <div className={styles.root}>
      <Skeleton variant="rectangular" animation="wave" {...rest} />
      {icon && cloneElement(icon, { className: styles.icon })}
    </div>
  );
}
