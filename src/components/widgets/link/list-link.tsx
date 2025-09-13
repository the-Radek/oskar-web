'use client';
import { ReactNode } from 'react';
import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton';
import Link, { LinkProps } from 'next/link';

interface Props {
  active?: boolean;
}

export type ListLinkProps = Props &
  ListItemButtonProps &
  LinkProps &
  Readonly<{
    children: ReactNode;
  }>;

export default function ListLink(props: ListLinkProps) {
  const { active, children, ...rest } = props;

  return (
    <ListItemButton
      component={Link}
      aria-current={active ? 'page' : null}
      sx={(theme) => ({
        padding: `${theme.spacing(2)} 0`,
        '&:hover, &.Mui-focusVisible': {
          backgroundColor: theme.palette.secondary.light,
        },
      })}
      {...rest}
    >
      {children}
    </ListItemButton>
  );
}
