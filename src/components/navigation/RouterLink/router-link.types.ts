import { LinkProps as MuiLinkProps } from '@mui/material/Link';
import { LinkProps as NextLinkProps } from 'next/link';

export type RouterLinkProps = MuiLinkProps<'a', NextLinkProps>;
