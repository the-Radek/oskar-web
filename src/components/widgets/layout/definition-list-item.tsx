'use client';
import { styled } from '@mui/material/styles';
import { PropsWithChildren, ReactNode } from 'react';

interface Props {
  label: ReactNode;
}

export type DefinitionListItemProps = PropsWithChildren<Props>;

const DefinitionListItemRoot = styled('div', { name: 'DefinitionListItem', slot: 'root' })(
  ({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(1),
  })
);

const DefinitionListItemTerm = styled('dt', { name: 'DefinitionListItem', slot: 'term' })(
  ({ theme }) => ({
    fontWeight: theme.typography.fontWeightMedium,
    '::after': { content: '":"' },
  })
);

const DefinitionListItemData = styled('dd', { name: 'DefinitionListItem', slot: 'data' })();

export default function DefinitionListItem(props: DefinitionListItemProps) {
  const { label, children } = props;

  return (
    <DefinitionListItemRoot>
      <DefinitionListItemTerm>{label}</DefinitionListItemTerm>
      <DefinitionListItemData>{children}</DefinitionListItemData>
    </DefinitionListItemRoot>
  );
}
