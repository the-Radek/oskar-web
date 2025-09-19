'use client';
import NextLink from 'next/link';
import type { RouterLinkProps } from './router-link.types';
import MuiLink from '@mui/material/Link';
import { usePathname } from 'next/navigation';

export default function RouterLink(props: RouterLinkProps) {
  const { href, children, ...rest } = props;
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <MuiLink component={NextLink} href={href} aria-current={active ? 'page' : null} {...rest}>
      {children}
    </MuiLink>
  );
}
