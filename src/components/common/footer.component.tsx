import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="flex items-center justify-between px-20 py-10 tertiary">
      <p>© {year} Přátelé LDT Oskar, z.s. Všechna práva vyhrazena.</p>
      <div>
        <IconButton
          component={Link}
          target="_blank"
          href="https://www.facebook.com/taborOskar.cz"
          aria-label="facebook"
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          component={Link}
          target="_blank"
          href="https://www.instagram.com/tabor_oskar/"
          aria-label="instagram"
        >
          <InstagramIcon />
        </IconButton>
      </div>
    </footer>
  );
}
