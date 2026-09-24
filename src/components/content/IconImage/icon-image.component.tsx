import type { IconImageProps } from './icon-image.types';
import styles from './icon-image.module.css';
import { cloneElement } from 'react';
import ImageIcon from '@mui/icons-material/Image';

export default function IconImage(props: IconImageProps) {
  const { children = <ImageIcon /> } = props;
  return (
    <div className={styles.root}>
      {children && cloneElement(children, { className: styles.icon })}
    </div>
  );
}
