export interface Page {
  label: string;
  href: string;
}

export interface MenuPaginationProps {
  pages: Array<Page>;
  current: number;
  label?: string;
}
