import Link from 'next/link';
import Tab from '@mui/material/Tab';
import type { TabLinkProps } from './tab-link.types';
import styles from './tab-link.module.css';
import clsx from 'clsx';

export default function TabLink(props: TabLinkProps) {
  const { active, ...rest } = props;

  return (
    <Tab
      component={Link}
      href={props.value}
      aria-current={active ? 'page' : null}
      textColor="inherit"
      className={clsx(styles.root, { [styles.active]: active })}
      {...rest}
    />
  );
}
