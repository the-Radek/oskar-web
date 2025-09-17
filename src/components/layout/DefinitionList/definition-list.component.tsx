import styles from './definition-list.module.css';
import type { DefinitionListProps } from './definition-list.types';

export default function DefinitionList({ children }: DefinitionListProps) {
  return <dl className={styles.root}>{children}</dl>;
}
