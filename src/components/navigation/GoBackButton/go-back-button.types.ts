import type { ButtonProps } from '@mui/material/Button';

export interface GoBackButtonProps extends Omit<ButtonProps, 'href'> {
  /** Local path without query (e.g. "/clanky"). When set, the button renders only if the previous page has exactly this path. */
  from?: string;
}
