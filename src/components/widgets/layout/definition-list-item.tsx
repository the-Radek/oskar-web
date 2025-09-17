import { PropsWithChildren, ReactNode } from 'react';
import styles from './definition-list-item.module.css';

interface Props {
  label: ReactNode;
}

export type DefinitionListItemProps = PropsWithChildren<Props>;

export default function DefinitionListItem(props: DefinitionListItemProps) {
  const { label, children } = props;

  return (
    <div className={styles.root}>
      <dt className={styles.term}>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
