import type { MapyCzProps } from './mapy-cz.types';
import styles from './mapy-cz.module.css';
import clsx from 'clsx';

export default function MapyCz(props: MapyCzProps) {
  const { mapUrl, className, ...rest } = props;
  return <iframe className={clsx(styles.root, className)} src={mapUrl} {...rest}></iframe>;
}
