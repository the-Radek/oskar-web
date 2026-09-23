import type { PaginationProps } from '@mui/material/Pagination';

export interface PaginationNavOwnProps {
  href: string;
  pageSize: number;
}

export type PaginationNavProps = PaginationProps & PaginationNavOwnProps;
