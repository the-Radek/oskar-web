import styles from './definition-list-item.module.css';
import type { DefinitionListItemProps } from './definition-list-item.types';

export default function DefinitionListItem({ label, children, ...rest }: DefinitionListItemProps) {
  return (
    <div className={styles.root}>
      <dt className={styles.term}>{label}</dt>
      <dd className={styles.data} {...rest}>
        {children}
      </dd>
    </div>
  );
}
