import styles from './definition-list-item.module.css';
import type { DefinitionListItemProps } from './definition-list-item.types';

export default function DefinitionListItem(props: DefinitionListItemProps) {
  const { label, children } = props;

  return (
    <div className={styles.root}>
      <dt className={styles.term}>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
