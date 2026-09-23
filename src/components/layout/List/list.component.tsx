import styles from './list.module.css';
import type { ListProps } from './list.types';
import clsx from 'clsx';

export default function List({ children, className, ...rest }: ListProps) {
  return (
    <ul className={clsx(styles.root, className)} {...rest}>
      {children}
    </ul>
  );
}
