import MapyCz from '@/components/geo/MapyCz';
import Typography from '@mui/material/Typography';
import { Metadata } from 'next';
import appConfig from '../../app.config.json';
import styles from './page.module.css';
import config from './page.config.json';
import metadataJson from './metadata.json';
import RouterLink from '@/components/navigation/RouterLink';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import List from '@/components/layout/List';
import OpenNew from '@/components/navigation/OpenNew';

export const metadata: Metadata = metadataJson;

export default function BeforeDeparture() {
  return (
    <main>
      <section>
        <Button
          component={RouterLink}
          href="/pro-zajemce"
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          className={styles.goBack}
        >
          Zpět
        </Button>
        <Typography variant="h2">Orientační seznam věcí potřebných na táboře</Typography>
        <List className={styles.checklist}>
          {config.checklist.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </List>
        <Typography>
          Doporučené kapesné 500 Kč. (Pro uhrazení případných nákladů s celodenním výletem – lístek
          na vlak/vstupné či drobný nákup.)
        </Typography>
        <Typography>Seznam je pouze orientační. Doplňte dle potřeb Vašeho dítěte.</Typography>
        <Typography>
          <strong>Cenné věci na tábor nedoporučujeme a neneseme za ně žádnou zodpovědnost.</strong>
        </Typography>
      </section>
      <div className={styles.content}>
        <section>
          <Typography id="odjezd" variant="h2">
            Odjezd na tábor
          </Typography>
          <Typography>
            Odjíždět budeme <strong>dne 13. 7.</strong> a <strong>dne 25. 7.</strong> z točny
            autobusů v ulici{' '}
            <OpenNew href={appConfig.maps.departure}>Oistrachova (Praha 13)</OpenNew> nedaleko
            zastávky metra Luka (linka B) <strong>ve 12:30</strong>. Prosíme o příchod nejpozději 45
            minut předem (tzn. 11:45).
          </Typography>
          <Typography gutterBottom>Návrat z tábora je na stejné místo v cca 11:30.</Typography>
          <MapyCz src={appConfig.maps.departure} />
        </section>
        <section>
          <Typography variant="h2">Individuální příjezd na tábor</Typography>
          <Typography gutterBottom>
            Pokud povezete dítě na tábor, prosíme o příjezd k přední zelené bráně, která je přímo u
            silnice.
          </Typography>
          <MapyCz src={appConfig.maps.gate} className={styles.map} />
        </section>
      </div>
    </main>
  );
}
