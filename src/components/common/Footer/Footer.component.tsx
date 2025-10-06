import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import styles from './footer.module.css';
import Fab from '@mui/material/Fab';

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className={styles.root}>
      <p>© {year} Přátelé LDT Oskar, z.s. Všechna práva vyhrazena.</p>
      <div className={styles.fabs}>
        <Fab
          color="meta"
          href="https://www.facebook.com/taborOskar.cz"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="facebook"
        >
          <FacebookIcon />
        </Fab>
        <Fab
          color="meta"
          href="https://www.instagram.com/tabor_oskar/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="instagram"
        >
          <InstagramIcon />
        </Fab>
      </div>
    </footer>
  );
}
