'use client';
import { styled } from '@mui/material/styles';
import { ReactNode } from 'react';

export interface DefinitionListProps {
  variant?: 'outlined';
}

const DefinitionListRoot = styled('dl', { name: 'OskarDefinitionList', slot: 'root' })(
  ({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gridAutoRows: 'auto',
    columnGap: theme.spacing(1),
    rowGap: theme.spacing(2),
    '& dt': {
      fontWeight: theme.typography.fontWeightMedium,
      '::after': { content: '":"' },
    },
    variants: [
      {
        props: {
          variant: 'outlined',
        },
        style: {
          border: `2px solid ${theme.palette.divider}`,
          boxShadow: 'none',
        },
      },
    ],
  })
);

export default function DefinitionList({ children }: Readonly<{ children: ReactNode }>) {
  return <DefinitionListRoot>{children}</DefinitionListRoot>;
}
