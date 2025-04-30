'use client';
import Link from 'next/link';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

export default function Footer() {
  const year = new Date().getFullYear();
  const theme = useTheme();

  return (
    <Box
      component={'footer'}
      sx={{
        backgroundColor: theme.palette.background.footer,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <p>© {year} Přátelé LDT Oskar, z.s. Všechna práva vyhrazena.</p>
      <div className="flex gap-4">
        <Fab
          component={Link}
          target="_blank"
          href="https://www.facebook.com/taborOskar.cz"
          aria-label="facebook"
          size="large"
        >
          <FacebookIcon />
        </Fab>
        <Fab
          component={Link}
          target="_blank"
          href="https://www.instagram.com/tabor_oskar/"
          aria-label="instagram"
          size="large"
        >
          <InstagramIcon />
        </Fab>
      </div>
    </Box>
  );
}
