import { ButtonGroupProps } from '@mui/material/ButtonGroup';

export interface Page {
  label: string;
  href: string;
}

export interface MenuPaginationProps extends ButtonGroupProps {
  pages: Array<Page>;
  current: number;
  label?: string;
}
