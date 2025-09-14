'use client';
import { styled } from '@mui/material/styles';
import { ReactNode } from 'react';

export type DefinitionListProps = Readonly<{ children: ReactNode }>;

const DefinitionListRoot = styled('dl', { name: 'DefinitionList', slot: 'root' })(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  margin: `${theme.spacing(1)} 0`,
}));

export default function DefinitionList({ children }: DefinitionListProps) {
  return <DefinitionListRoot>{children}</DefinitionListRoot>;
}
