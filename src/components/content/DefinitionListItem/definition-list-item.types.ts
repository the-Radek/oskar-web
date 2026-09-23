import type { ReactNode } from 'react';

export interface DefinitionListItemProps extends React.ComponentPropsWithoutRef<'dd'> {
  label: ReactNode;
}
