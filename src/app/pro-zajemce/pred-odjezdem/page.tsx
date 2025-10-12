import MapyCz from '@/components/geo/MapyCz';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { Metadata } from 'next';
import styles from './page.module.css';
import Link from '@mui/material/Link';
import appConfig from '../../app.config.json';

export const metadata: Metadata = {
  title: 'Před odjezdem',
};

export default function ThemedGame() {
  return (
    <main>
      <section>
        <Typography variant="h2">Orientační seznam věcí potřebných na táboře</Typography>
        <Typography>
          Doporučené kapesné 500 Kč. (Pro uhrazení případných nákladů s celodenním výletem – lístek
          na vlak/vstupné či drobný nákup.)
        </Typography>
        <Typography>Seznam je pouze orientační. Doplňte dle potřeb Vašeho dítěte.</Typography>
        <Typography>
          Cenné věci na tábor nedoporučujeme a neneseme za ně žádnou zodpovědnost.
        </Typography>
      </section>
      <section>
        <Typography variant="h2">Odjezd na tábor</Typography>
        <Typography>
          Odjíždět budeme <strong>dne 7. 7.</strong>{' '}
          <Link href={appConfig.maps.departure} target="_blank" rel="noopener noreferrer">
            z točny autobusů v ulici Oistrachova (Praha 13)
          </Link>{' '}
          nedaleko zastávky metra Luka (linka B) <strong>ve 12:30h</strong>.
        </Typography>
        <Typography>Prosíme o příchod nejpozději 45 minut předem (tzn. 11:45).</Typography>
        <Typography gutterBottom>Návrat z tábora je na stejné místo v cca 11:30h.</Typography>
        <Accordion className={styles.accordion}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel-content">
            <Typography component="span">Mapa místa odjezdu</Typography>
          </AccordionSummary>
          <AccordionDetails className={styles.details}>
            <MapyCz src={appConfig.maps.departure} />
          </AccordionDetails>
        </Accordion>
      </section>
    </main>
  );
}
