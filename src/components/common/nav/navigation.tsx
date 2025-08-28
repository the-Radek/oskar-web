'use client';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import DesktopNav from './desktop-nav';
import MobileNav from './mobile-nav';

export default function Navigation() {
  const theme = useTheme();
  // the negation of the media query is to ensure mobile first approach
  const isMobile = !useMediaQuery(theme.breakpoints.up('sm'));

  return <>{isMobile ? <MobileNav /> : <DesktopNav />}</>;
}
