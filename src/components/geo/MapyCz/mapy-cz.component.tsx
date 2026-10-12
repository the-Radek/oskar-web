import ProgressiveIframe from '@/components/progressive/ProgressiveIframe';
import MapIcon from '@mui/icons-material/Map';
import type { MapyCzProps } from './mapy-cz.types';
import styles from './mapy-cz.module.css';
import clsx from 'clsx';

export default function MapyCz(props: MapyCzProps) {
  const { className, ...rest } = props;
  const classes = clsx(styles.root, className);

  return <ProgressiveIframe className={classes} icon={<MapIcon />} title="Mapa" {...rest} />;
}
