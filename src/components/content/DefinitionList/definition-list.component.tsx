import styles from './definition-list.module.css';
import type { DefinitionListProps } from './definition-list.types';
import clsx from 'clsx';

export default function DefinitionList({ children, className, ...rest }: DefinitionListProps) {
  return (
    <dl className={clsx(styles.root, className)} {...rest}>
      {children}
    </dl>
  );
}
