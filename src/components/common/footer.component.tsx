import Link from 'next/link';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import Fab from '@mui/material/Fab';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="flex items-center justify-between px-20 py-10 tertiary"
      style={{ borderRadius: '0 0 12px 12px' }}
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
    </footer>
  );
}
