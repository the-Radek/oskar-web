'use client';
import ListItemButton from '@mui/material/ListItemButton';
import Link from 'next/link';
import type { ListLinkProps } from './list-link.types';

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
