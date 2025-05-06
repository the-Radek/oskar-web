'use client';
import Image from 'next/image';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import DesktopNav from './nav/desktop-nav';
import MobileNav from './nav/mobile-nav';

export default function Header() {
  const theme = useTheme();
  // the negative of the media query is to ensure mobile first approach
  const isMobile = !useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box
      component={'header'}
      sx={(theme) => ({
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
      })}
    >
      {isMobile ? <MobileNav /> : <DesktopNav />}
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
