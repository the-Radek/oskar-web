import { Metadata } from 'next';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MapyCz from '@/components/geo/MapyCz';
import RouterLink from '@/components/navigation/RouterLink';
import styles from './page.module.css';
import * as assets from './page.assets';
import appConfig from '../app.config.json';
import metadataJson from './metadata.json';
import config from './page.config.json';
import Surface from '@/components/layout/Surface';
import ApplicationButton from '@/components/common/ApplicationButton';
import ShowIf from '@/components/layout/ShowIf';
import OskarCard from '@/components/content/OskarCard';

export const metadata: Metadata = metadataJson;

export default function ForApplicantsPage() {
  const actions = (orientation: 'vertical' | 'horizontal') => (
    <ButtonGroup
      variant="contained"
      orientation={orientation}
      size="large"
      fullWidth
      className={styles.actions}
    >
      <Button component={RouterLink} href="/pro-zajemce/pred-odjezdem">
        Informace před odjezdem
      </Button>
      <Button href="/docs/Bezinfekcnost-GDPR.pdf" target="_blank" startIcon={<DownloadIcon />}>
        Bezinfekčnost a GDPR
      </Button>
      <Button href="/docs/Lekarsky-posudek.pdf" target="_blank" startIcon={<DownloadIcon />}>
        Lékařský posudek
      </Button>
    </ButtonGroup>
  );

  return (
    <main>
      <ApplicationButton />
      <div className={styles.cards}>
        {config.turnusy.map(({ imageKey, ...turnus }) => (
          <OskarCard
            key={turnus.title}
            image={assets[imageKey as keyof typeof assets]}
            {...turnus}
          />
        ))}
      </div>
      <Surface className={styles.paper}>
        <Image
          src={assets.illustration}
          alt="Tužka poutník"
          sizes="(max-width: 900px) 100px, 300px"
          className={styles.illustration}
        />
        <p>
          Letní tábor Oskar nabízí tři turnusy, které jsou určeny pro děti ve věku od 5 do 16 let.
          Pokud jste už vybrali termín, stačí jen vyplnit{' '}
          <RouterLink href="/prihlaska">přihlášku</RouterLink>.
        </p>
        <section aria-label="price">
          <Typography component="h2" variant="h4">
            Cena
          </Typography>
          <Typography align="justify">
            Cena zahrnuje stravu, ubytování, program, dopravu z Prahy a zpět, odměny do soutěží.
            Děti si mimo poukaz budou platit fotografii, případné vstupenky a dopravu při celodenním
            výletu.
          </Typography>
        </section>
        <section aria-label="departure">
          <Typography component="h2" variant="h4">
            Odjezd
          </Typography>
          <Typography align="justify" gutterBottom>
            Odjezdy a příjezdy na tábor Oskar jsou z točny autobusů v ulici Oistrachova (Praha 13)
            nedaleko zastávky metra Luka (linka B). Podrobné informace o čase odjezdu a příjezdu
            obdržíte včas emaile.
          </Typography>
          <Accordion className={styles.accordion}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel-content">
              <Typography component="span">Mapa místa odjezdu</Typography>
            </AccordionSummary>
            <AccordionDetails className={styles.details}>
              <MapyCz src={appConfig.maps.departure} />
            </AccordionDetails>
          </Accordion>
        </section>
      </Surface>
      <ShowIf above="md">{actions('horizontal')}</ShowIf>
      <ShowIf below="md">{actions('vertical')}</ShowIf>
    </main>
  );
}
