import Tabs from '@mui/material/Tabs';
import { usePathname } from 'next/navigation';
import routes from './routes';
import TabLink from '@/components/utils/merged/tab-link';

export default function DesktopNav() {
  const currentPath = usePathname();

  return (
    <Tabs
      component={'nav'}
      value={routes.find((x) => x.path == currentPath)?.path ?? false}
      textColor="inherit"
      variant="fullWidth"
      sx={(theme) => ({
        '& .MuiTabs-indicator': {
          backgroundColor: theme.palette.primary.dark,
          height: 3,
        },
      })}
    >
      {routes.map((x) => (
        <TabLink key={x.path} label={x.label} value={x.path} active={x.path == currentPath} />
      ))}
    </Tabs>
  );
}
