import { Metadata } from 'next';
import routes from '../routes';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import styles from './page.module.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MapyCz from '@/components/geo/MapyCz';
import Image from 'next/image';
import RouterLink from '@/components/navigation/RouterLink';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

export const metadata: Metadata = {
  title: routes['/pro-zajemce'].label,
};

export default function Turns() {
  return (
    <main className={styles.root}>
      <div className={styles.cards}>
        <Card variant="outlined">
          <CardContent>
            <Typography component="h2">TURNUS I.</Typography>
            <Typography variant="caption">1. 7. 2025 - 7. 7. 2025</Typography>
            <p>Na první turnus se letos můžete těšit pod vedením Oskárka.</p>
            <p>JIŽ OBSAZEN</p>
          </CardContent>
          {/* <CardMedia
            component={Image}
            image="/image/turnus-1.png"
            alt="Turnus 1"
            width={1122}
            height={747}
            fill
          /> */}
          <Image src="/image/turnus-1.png" alt="Turnus 1" width={1122} height={747} />
        </Card>
        <Card>
          <CardContent>
            <Typography component="h2">TURNUS II.</Typography>
            <Typography variant="caption">1. 7. 2025 - 7. 7. 2025</Typography>
            <p>
              Na druhý turnus se letos můžete těšit pod vedením Vojty Macháčka, Verči Ilkové, Šárky
              Večerníkové a Kuby Švihlíka.
            </p>
            <p>Cena: 7 800,-</p>
          </CardContent>
          {/* <CardMedia
            component={Image}
            image="/image/turnus-2.png"
            alt="Turnus 2"
            width={779}
            height={519}
            fill
          /> */}
        </Card>
        <Card>
          <CardContent>
            <Typography component="h2">TURNUS III.</Typography>
            <Typography variant="caption">1. 7. 2025 - 7. 7. 2025</Typography>
            <p>
              Na třetí turnus se letos můžete těšit pod vedením Aničky Puklové, Vojty Macháčka, Báry
              Navrátilové a Kačky Weberové.
            </p>
            <p>Cena: 7 800,-</p>
          </CardContent>
          {/* <CardMedia
            component={Image}
            image="/image/turnus-3.png"
            alt="Turnus 3"
            width={1106}
            height={737}
            fill
          /> */}
        </Card>
      </div>
      <Paper className={styles.paper}>
        <Image
          src="/image/pencil-wanderer.png"
          width={1800}
          height={3300}
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
          <Typography align="justify">
            Odjezdy a příjezdy na tábor Oskar jsou z točny autobusů v ulici Oistrachova (Praha 13)
            nedaleko zastávky metra Luka (linka B). Podrobné informace o čase odjezdu a příjezdu
            obdržíte včas emaile.
          </Typography>
          <Accordion className={styles.accordion}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel-content">
              <Typography component="span">Mapa místa odjezdu</Typography>
            </AccordionSummary>
            <AccordionDetails className={styles['accordion-content']}>
              <MapyCz src="https://mapy.com/s/lecokuhavo" />
            </AccordionDetails>
          </Accordion>
        </section>
      </Paper>
      <ButtonGroup variant="contained" size="large" fullWidth className={styles.actions}>
        <Button component={RouterLink} href="pred-odjezdem">
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
