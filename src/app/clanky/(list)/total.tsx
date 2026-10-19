'use client';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationNav from '@/components/navigation/PaginationNav';
import styles from './total.module.css';

const PostsTotalContext = createContext<{
  total: number | null;
  setTotal: (total: number) => void;
}>({ total: null, setTotal: () => {} });

/**
 * Holds the total post count so the pagination can live outside the results' Suspense boundary.
 *
 * @param children header, results and footer; stay server-rendered
 */
export function PostsTotalProvider({ children }: { children: ReactNode }) {
  const [total, setTotal] = useState<number | null>(null);
  return <PostsTotalContext value={{ total, setTotal }}>{children}</PostsTotalContext>;
}

/**
 * Reports the total post count to PostsTotalProvider. Renders nothing.
 *
 * @param total number of published posts across all pages
 */
export function PostsTotal({ total }: { total: number }) {
  const { setTotal } = useContext(PostsTotalContext);
  useEffect(() => setTotal(total), [setTotal, total]);
  return null;
}

interface PostsPaginationProps {
  page: number;
  pageSize: number;
  label: string;
}

export function PostsPagination({ page, pageSize, label }: PostsPaginationProps) {
  const { total } = useContext(PostsTotalContext);

  if (!total) {
    return (
      <Pagination
        shape="rounded"
        color="primary"
        page={1}
        count={10}
        className={styles.pagination}
        disabled
        aria-hidden
      />
    );
  }

  return (
    <PaginationNav
      page={page}
      count={Math.max(1, Math.ceil(total / pageSize))}
      className={styles.pagination}
      aria-label={label}
    />
  );
}
