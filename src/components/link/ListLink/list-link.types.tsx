import { ListItemButtonProps } from '@mui/material/ListItemButton';
import { LinkProps } from 'next/link';
import { ReactNode } from 'react';

interface Props {
  active?: boolean;
  children: Readonly<ReactNode>;
}

export type ListLinkProps = Props & ListItemButtonProps & LinkProps;
