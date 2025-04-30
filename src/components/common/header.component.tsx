'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Tabs from '@mui/material/Tabs';
import Tab, { TabProps } from '@mui/material/Tab';
import routes from './routes';
import Box from '@mui/material/Box';

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

export default function Header() {
  const currentPath = usePathname();

  return (
    <Box
      component={'header'}
      sx={(theme) => ({
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
      })}
    >
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
      <Image
        src="/banner-2025.jpg"
        width={4724}
        height={768}
        alt="OSKAR"
        sizes="(max-width: 1280px) 100vw, 1280px"
        priority
      />
    </Box>
  );
}
