'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Tabs from '@mui/material/Tabs';
import Tab, { TabProps } from '@mui/material/Tab';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

function LinkTab(props: TabProps & { active?: boolean }) {
  const { active, ...rest } = props;

  return (
    <Tab
      component={Link}
      href={props.value}
      aria-current={active ? 'page' : null}
      textColor="inherit"
      sx={{
        textTransform: 'none',
        fontWeight: active ? 'bold' : null,
        opacity: 1,
      }}
      {...rest}
    />
  );
}

const routes = [
  { path: '/', label: 'Úvodní stránka' },
  { path: '/taborova-hra', label: 'Celotáborová hra' },
  { path: '/turnusy', label: 'Turnusy' },
  { path: '/o-tabore', label: 'O táboře' },
  { path: '/galerie', label: 'Galerie' },
  { path: '/kontakty', label: 'Kontakty' },
];

export default function Header() {
  const currentPath = usePathname();
  const theme = useTheme();

  return (
    <Box
      component={'header'}
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      }}
    >
      <Tabs
        component={'nav'}
        value={routes.find((x) => x.path == currentPath)?.path ?? false}
        textColor="inherit"
        indicatorColor="secondary"
        variant="fullWidth"
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
