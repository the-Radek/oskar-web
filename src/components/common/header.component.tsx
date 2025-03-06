'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Tabs from '@mui/material/Tabs';
import Tab, { TabProps } from '@mui/material/Tab';

function LinkTab(props: TabProps) {
  const currentPath = usePathname();
  return (
    <Tab
      component={Link}
      href={props.value}
      aria-current={props.value == currentPath ? 'page' : null}
      textColor="inherit"
      sx={{
        padding: 'calc(var(--spacing) * 8) 0',
        textTransform: 'none',
        fontSize: '1.1rem',
        fontWeight: props.value == currentPath ? 'bold' : null,
        opacity: 1,
      }}
      {...props}
    />
  );
}

export default function Header() {
  const paths = ['/', '/taborova-hra', '/turnusy', '/o-tabore', '/galerie', '/kontakty'];
  const currentPath = usePathname();

  return (
    <header className="secondary" style={{ borderRadius: '12px 12px 0 0' }}>
      <Tabs
        value={paths.includes(currentPath) && currentPath}
        variant="fullWidth"
        sx={{ height: 'auto' }}
        textColor="inherit"
      >
        <LinkTab value="/" label="Úvodní stránka" />
        <LinkTab value="/taborova-hra" label="Celotáborová hra" />
        <LinkTab value="/turnusy" label="Turnusy" />
        <LinkTab value="/o-tabore" label="O táboře" />
        <LinkTab value="/galerie" label="Galerie" />
        <LinkTab value="/kontakty" label="Kontakty" />
      </Tabs>
      <Image
        src="/banner-2025.jpg"
        width={4724}
        height={768}
        alt="OSKAR"
        sizes="(max-width: 1280px) 100vw, 1280px"
        priority
      />
    </header>
  );
}
