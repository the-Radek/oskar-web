import type { MapyCzProps } from './mapy-cz.types';
import styles from './mapy-cz.module.css';

export default function MapyCz(props: MapyCzProps) {
  const { mapUrl, width = 500, height = 333, ...rest } = props;
  return (
    <iframe className={styles.root} src={mapUrl} width={width} height={height} {...rest}></iframe>
  );
}
