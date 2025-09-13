'use client';
import Link from 'next/link';
import Tab, { TabProps } from '@mui/material/Tab';

export type TabLinkProps = TabProps & Readonly<{ active?: boolean }>;

export default function TabLink(props: TabLinkProps) {
  const { active, ...rest } = props;

  return (
    <Tab
      component={Link}
      href={props.value}
      aria-current={active ? 'page' : null}
      textColor="inherit"
      sx={(theme) => ({
        padding: `${theme.spacing(5)} 0`,
        textTransform: 'none',
        fontWeight: active ? theme.typography.fontWeightBold : null,
        fontSize: '1.1rem',
        opacity: 1,
        '&:hover, &.Mui-focusVisible': {
          backgroundColor: theme.palette.primary.light,
        },
      })}
      {...rest}
    />
  );
}
