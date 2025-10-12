import { Metadata } from 'next';
import Image from 'next/image';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import MapyCz from '@/components/geo/MapyCz';
import RouterLink from '@/components/navigation/RouterLink';
import routes from '../routes';
import styles from './page.module.css';
import * as assets from './page.assets';
import appConfig from '../app.config.json';

export const metadata: Metadata = {
  title: routes['/pro-zajemce'].label,
};

export default function Turns() {
  return (
    <main className={styles.root}>
      <div className={styles.cards}>
        <Card variant="outlined">
          <CardContent>
            <Typography component="h2" variant="h2" align="center">
              TURNUS I.
            </Typography>
            <Typography component="p" variant="body2" align="center" color="primary.dark">
              1. 7. 2025 - 7. 7. 2025
            </Typography>
            <Typography align="justify">
              Na první turnus se letos můžete těšit pod vedením Oskárka.
            </Typography>
            <Typography align="center">JIŽ OBSAZEN</Typography>
          </CardContent>
          <CardMedia>
            <Image
              src={assets.turnus1}
              alt="Turnus 1"
              sizes="(max-width: 400px) 100vw, (max-width: 900px) 400px, (max-width: 1200px) 33vw, 400px"
            />
          </CardMedia>
        </Card>
        <Card variant="outlined">
          <CardContent>
            <Typography component="h2" variant="h2" align="center">
              TURNUS II.
            </Typography>
            <Typography component="p" variant="body2" align="center" color="primary.dark">
              7. 7. 2025 - 19. 7. 2025
            </Typography>
            <Typography align="justify">
              Na druhý turnus se letos můžete těšit pod vedením Vojty Macháčka, Verči Ilkové, Šárky
              Večerníkové a Kuby Švihlíka.
            </Typography>
            <Typography align="center">Cena: 7 800,-</Typography>
          </CardContent>
          <CardMedia>
            <Image
              src={assets.turnus2}
              alt="Turnus 2"
              sizes="(max-width: 400px) 100vw, (max-width: 900px) 400px, (max-width: 1200px) 33vw, 400px"
            />
          </CardMedia>
        </Card>
        <Card variant="outlined">
          <CardContent>
            <Typography component="h2" variant="h2" align="center">
              TURNUS III.
            </Typography>
            <Typography component="p" variant="body2" align="center" color="primary.dark">
              19. 7. 2025 - 31. 7. 2025
            </Typography>
            <Typography align="justify">
              Na třetí turnus se letos můžete těšit pod vedením Aničky Puklové, Vojty Macháčka, Báry
              Navrátilové a Kačky Weberové.
            </Typography>
            <Typography align="center">Cena: 7 800,-</Typography>
          </CardContent>
          <CardMedia>
            <Image
              src={assets.turnus3}
              alt="Turnus 3"
              sizes="(max-width: 400px) 100vw, (max-width: 900px) 400px, (max-width: 1200px) 33vw, 400px"
            />
          </CardMedia>
        </Card>
      </div>
      <Paper className={styles.paper}>
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
      </Paper>
      <ButtonGroup variant="contained" size="large" fullWidth className={styles.actions}>
        <Button component={RouterLink} href="pro-zajemce/pred-odjezdem">
          Co si zabalit na tábor
        </Button>
        <Button href="/docs/Bezinfekcnost-GDPR.pdf" target="_blank" startIcon={<DownloadIcon />}>
          Bezinfekčnost a GDPR
        </Button>
        <Button href="/docs/Lekarsky-posudek.pdf" target="_blank" startIcon={<DownloadIcon />}>
          Lékařský posudek
        </Button>
      </ButtonGroup>
    </main>
  );
}
