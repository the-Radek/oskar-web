'use client';
import Link from 'next/link';
import Fab from '@mui/material/Fab';
import type { FabLinkProps } from './fab-link.types';

export default function FabLink(props: FabLinkProps) {
  const { children, ...rest } = props;

  return (
    <Fab
      component={Link}
      target="_blank"
      size="large"
      sx={(theme) => ({
        backgroundColor: theme.palette.meta.main,
        color: theme.palette.meta.contrastText,
        '&:hover, &.Mui-focusVisible': {
          backgroundColor: theme.palette.meta.light,
        },
      })}
      {...rest}
    >
      {children}
    </Fab>
  );
}
