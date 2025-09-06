import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import Box from '@mui/material/Box';
import FabLink from '@/components/utils/merged/fab-link';
import theme from '@/theme/variables';

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <Box
      component={'footer'}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: theme.spacing(2),
        padding: theme.spacing(5),
        color: theme.palette.secondary.contrastText,
        backgroundColor: theme.palette.secondary.main,
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column',
        },
      }}
    >
      <p>© {year} Přátelé LDT Oskar, z.s. Všechna práva vyhrazena.</p>
      <Box
        sx={{
          display: 'flex',
          gap: theme.spacing(2),
        }}
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
