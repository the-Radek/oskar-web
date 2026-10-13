import type { ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { PostsPagination, PostsTotalProvider } from './total';
import styles from './view.module.css';

export const PAGE_SIZES = [5, 10, 20, 50];
export const DEFAULT_PAGE_SIZE = 5;

interface PostsViewProps {
  page: number;
  pageSize: number;
  children: ReactNode;
}

export default function PostsView({ page, pageSize, children }: PostsViewProps) {
  return (
    <main>
      <PostsTotalProvider>
        <div className={styles.header}>
          <Typography variant="h2">Články</Typography>
          <PostsPagination page={page} pageSize={pageSize} label="Stránkování nahoře" />
        </div>
        {children}
        <div className={styles.footer}>
          <PostsPagination page={page} pageSize={pageSize} label="Stránkování dole" />
          <ButtonGroup
            size="small"
            className={styles.pageSize}
            aria-label="Počet článků na stránku"
          >
            {PAGE_SIZES.map((size) => (
              <Button
                key={size}
                component={Link}
                href={`/clanky?pageSize=${size}`}
                variant={size === pageSize ? 'contained' : 'outlined'}
                aria-label={`${size} článků na stránku`}
                aria-current={size === pageSize || undefined}
              >
                {size}
              </Button>
            ))}
          </ButtonGroup>
        </div>
      </PostsTotalProvider>
    </main>
  );
}
