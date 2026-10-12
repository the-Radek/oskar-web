'use client';
import Tabs from '@mui/material/Tabs';
import { usePathname } from 'next/navigation';
import routes from '@/app/routes';
import type { DesktopNavProps } from './desktop-nav.types';
import styles from './desktop-nav.module.css';
import Tab from '@mui/material/Tab';
import RouterLink from '../RouterLink';

export default function DesktopNav(props: DesktopNavProps) {
  const pathname = usePathname();

  return (
    <Tabs
      component={'nav'}
      aria-label="Hlavní navigace"
      value={pathname in routes && pathname}
      textColor="inherit"
      variant="fullWidth"
      classes={{
        indicator: styles.indicator,
      }}
      {...props}
    >
      {Object.entries(routes).map(([path, route]) => (
        <Tab
          component={RouterLink}
          key={path}
          label={route.label}
          value={path}
          href={path}
          className={styles.tab}
          underline="none"
          color="inherit"
        />
      ))}
    </Tabs>
  );
}
