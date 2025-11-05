import { LinkProps } from '@mui/material/Link';

export interface OpenNewProps extends LinkProps {
  tooltip?: 'before' | 'after';
}
