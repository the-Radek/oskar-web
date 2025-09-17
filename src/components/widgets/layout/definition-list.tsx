import { ReactNode } from 'react';
import styles from './definition-list.module.css';

export type DefinitionListProps = Readonly<{ children: ReactNode }>;

export default function DefinitionList({ children }: DefinitionListProps) {
  return <dl className={styles.root}>{children}</dl>;
}
