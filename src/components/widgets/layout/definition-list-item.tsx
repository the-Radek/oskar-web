import { PropsWithChildren } from 'react';

export interface DefinitionListItemProps {
  label: string;
}

export default function DefinitionListItem(props: PropsWithChildren<DefinitionListItemProps>) {
  const { label, children } = props;

  return (
    <>
      <dt>{label}</dt>
      <dd>{children}</dd>
    </>
  );
}
