'use client';
import Tabs from '@mui/material/Tabs';
import { usePathname } from 'next/navigation';
import routes from '@/app/routes';
import TabLink from '@/components/widgets/link/tab-link';
import { DesktopNavProps } from './DesktopNav.types';

export default function DesktopNav(props: DesktopNavProps) {
  const currentPath = usePathname();

  return (
    <Tabs
      component={'nav'}
      value={currentPath in routes && currentPath}
      textColor="inherit"
      variant="fullWidth"
      sx={(theme) => ({
        '& .MuiTabs-indicator': {
          backgroundColor: theme.palette.primary.dark,
          height: 3,
        },
      })}
      {...props}
    >
      {Object.entries(routes).map(([path, route]) => (
        <TabLink key={path} label={route.label} value={path} active={path == currentPath} />
      ))}
    </Tabs>
  );
}
