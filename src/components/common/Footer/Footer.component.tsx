import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import styles from './footer.module.css';
import FabLink from '@/components/link/FabLink';

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className={styles.root}>
      <p>© {year} Přátelé LDT Oskar, z.s. Všechna práva vyhrazena.</p>
      <div className={styles.fabs}>
        <FabLink href="https://www.facebook.com/taborOskar.cz" aria-label="facebook">
          <FacebookIcon />
        </FabLink>
        <FabLink href="https://www.instagram.com/tabor_oskar/" aria-label="instagram">
          <InstagramIcon />
        </FabLink>
      </div>
    </footer>
  );
}
