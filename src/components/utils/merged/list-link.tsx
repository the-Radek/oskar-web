import { ReactNode } from 'react';
import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton';
import Link, { LinkProps } from 'next/link';
import theme from '@/theme/variables';

export default function ListLink(
  props: ListItemButtonProps &
    LinkProps &
    Readonly<{
      children: ReactNode;
    }> & { active?: boolean }
) {
  const { active, children, ...rest } = props;

  return (
    <ListItemButton
      component={Link}
      aria-current={active ? 'page' : null}
      sx={{
        padding: `${theme.spacing(2)} 0`,
        '&:hover, &.Mui-focusVisible': {
          backgroundColor: theme.palette.secondary.light,
        },
      }}
      {...rest}
    >
      {children}
    </ListItemButton>
  );
}
