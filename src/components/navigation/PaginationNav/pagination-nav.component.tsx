'use client';
import Pagination from '@mui/material/Pagination';
import type { PaginationNavProps } from './pagination-nav.types';
import PaginationItem from '@mui/material/PaginationItem';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { mergeSearchParams } from '@/lib/utilities/merge-search-params';

export default function PaginationNav({ ...rest }: PaginationNavProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <Pagination
      shape="rounded"
      color="primary"
      siblingCount={3}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          href={{ pathname, query: mergeSearchParams(searchParams, { page: item.page }) }}
          {...item}
        />
      )}
      {...rest}
    />
  );
}
