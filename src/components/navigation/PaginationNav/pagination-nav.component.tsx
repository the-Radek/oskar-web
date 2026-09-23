'use client';
import Pagination from '@mui/material/Pagination';
import type { PaginationNavProps } from './pagination-nav.types';
import PaginationItem from '@mui/material/PaginationItem';
import Link from 'next/link';

export default function PaginationNav({ href, pageSize, ...rest }: PaginationNavProps) {
  return (
    <Pagination
      shape="rounded"
      color="primary"
      siblingCount={3}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          href={href + `?page=${item.page}&pageSize=${pageSize}`}
          {...item}
        />
      )}
      {...rest}
    />
  );
}
