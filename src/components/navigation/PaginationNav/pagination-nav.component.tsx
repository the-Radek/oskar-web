'use client';
import Pagination, { type PaginationProps } from '@mui/material/Pagination';
import type { PaginationNavProps } from './pagination-nav.types';
import PaginationItem from '@mui/material/PaginationItem';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { mergeSearchParams } from '@/lib/utilities/merge-search-params';
import { useMediaQueryHydrated } from '@/lib/utilities/use-media-query-hydrated';

const ITEM_LABELS: Record<string, string> = {
  first: 'První stránka',
  last: 'Poslední stránka',
  next: 'Další stránka',
  previous: 'Předchozí stránka',
};

const getItemAriaLabel: PaginationProps['getItemAriaLabel'] = (type, page, selected) =>
  ITEM_LABELS[type] ?? (selected ? `Stránka ${page}` : `Přejít na stránku ${page}`);

export default function PaginationNav({ ...rest }: PaginationNavProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isLarge = useMediaQueryHydrated('(min-width: 600px)');

  return (
    <Pagination
      shape="rounded"
      color="primary"
      siblingCount={isLarge ? 3 : 1}
      getItemAriaLabel={getItemAriaLabel}
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
