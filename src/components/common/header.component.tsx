import Image from 'next/image';
import Box from '@mui/material/Box';
import Navigation from './nav/navigation';
import theme from '@/theme/variables';

export default function Header() {
  return (
    <Box
      component={'header'}
      sx={{
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Navigation />
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
