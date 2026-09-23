import type { PaginationProps } from '@mui/material/Pagination';

export interface PaginationNavProps extends PaginationProps {
  href: string;
  pageSize: number;
}
