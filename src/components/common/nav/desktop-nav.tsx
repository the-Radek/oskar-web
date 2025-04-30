import Tab, { TabProps } from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import routes from './routes';

function LinkTab(props: TabProps & { active?: boolean }) {
  const { active, ...rest } = props;

  return (
    <Tab
      component={Link}
      href={props.value}
      aria-current={active ? 'page' : null}
      textColor="inherit"
      sx={(theme) => ({
        padding: `${theme.spacing(5)} 0`,
        textTransform: 'none',
        fontWeight: active ? theme.typography.fontWeightBold : null,
        fontSize: '1.1rem',
        opacity: 1,
        '&:hover, &.Mui-focusVisible': {
          backgroundColor: theme.palette.primary.light,
        },
      })}
      {...rest}
    />
  );
}

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
        <LinkTab key={x.path} label={x.label} value={x.path} active={x.path == currentPath} />
      ))}
    </Tabs>
  );
}
