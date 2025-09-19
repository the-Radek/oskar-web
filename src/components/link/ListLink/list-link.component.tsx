import ListItemButton from '@mui/material/ListItemButton';
import Link from 'next/link';
import type { ListLinkProps } from './list-link.types';
import styles from './list-link.module.css';

export default function ListLink(props: ListLinkProps) {
  const { active, children, ...rest } = props;

  return (
    <ListItemButton
      component={Link}
      aria-current={active ? 'page' : null}
      className={styles.root}
      {...rest}
    >
      {children}
    </ListItemButton>
  );
}
