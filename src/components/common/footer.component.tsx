'use client';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import Box from '@mui/material/Box';
import FabLink from '@/components/utils/merged/fab-link';

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <Box
      component={'footer'}
      sx={(theme) => ({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: theme.spacing(2),
        padding: theme.spacing(5),
        backgroundColor: theme.palette.background.footer,
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column',
        },
      })}
    >
      <p>© {year} Přátelé LDT Oskar, z.s. Všechna práva vyhrazena.</p>
      <Box
        sx={(theme) => ({
          display: 'flex',
          gap: theme.spacing(2),
        })}
      >
        <FabLink href="https://www.facebook.com/taborOskar.cz" aria-label="facebook">
          <FacebookIcon />
        </FabLink>
        <FabLink href="https://www.instagram.com/tabor_oskar/" aria-label="instagram">
          <InstagramIcon />
        </FabLink>
      </Box>
    </Box>
  );
}
