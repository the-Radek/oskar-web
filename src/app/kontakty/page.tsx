import { Metadata } from 'next';
import Typography from '@mui/material/Typography';
import DefinitionList from '@/components/layout/DefinitionList';
import DefinitionListItem from '@/components/layout/DefinitionListItem';
import Phone from '@/components/data/Phone';
import Email from '@/components/data/Email';
import styles from './page.module.css';
import MapyCz from '@/components/geo/MapyCz';
import Paper from '@mui/material/Paper';
import Image from 'next/image';
import appConfig from '../app.config.json';
import metadataJson from './metadata.json';

export const metadata: Metadata = metadataJson;

export default function Contacts() {
  return (
    <main className={styles.root}>
      <div className={styles.content}>
        <section aria-label="post address">
          <Typography variant="h2">Adresa pro dopisy</Typography>
          <address className={styles.address}>
            Tábor Oskar – Holubí kout
            <br />
            <i>jméno dítěte</i>&nbsp;
            <Typography component="span" variant="body2" fontWeight="light">
              (doplňte číslo oddílu, které se dozvíte při odjezdu)
            </Typography>
            <br />
            337 01 Veselá
            <br />
          </address>
        </section>
        <section aria-label="contact details">
          <Typography variant="h2">Kontakt</Typography>
          <DefinitionList>
            <DefinitionListItem label="Telefon na tábor">
              <Phone>602 829 892</Phone>
            </DefinitionListItem>
            <DefinitionListItem label="E-mail">
              <Email>spolek.oskar@gmail.com</Email>
            </DefinitionListItem>
          </DefinitionList>
        </section>
        <section aria-label="camp's phone">
          <Typography variant="h2">Telefon na tábor</Typography>
          <DefinitionList>
            <DefinitionListItem label="I. turnus">
              <Phone>602 829 892</Phone>
            </DefinitionListItem>
            <DefinitionListItem label="II. turnus">
              <Phone>774 907 911</Phone>
            </DefinitionListItem>
            <DefinitionListItem label="III. turnus">
              <Phone>732 350 322</Phone>
            </DefinitionListItem>
            <DefinitionListItem label="provozovatel areálu">
              <Phone>602 829 892</Phone>
            </DefinitionListItem>
          </DefinitionList>
        </section>
        <section aria-label="organizer">
          <Typography variant="h2">Organizátor</Typography>
          <Typography fontWeight="medium">Přátelé LDT Oskar, z.s.</Typography>
          <DefinitionList>
            <DefinitionListItem label="předseda">Anna Puklová</DefinitionListItem>
            <DefinitionListItem label="kontakt">
              <Phone>732 350 322</Phone> / <Email>spolek.oskar@gmail.com</Email>
            </DefinitionListItem>
          </DefinitionList>
        </section>
        <section aria-label="map">
          <MapyCz src={appConfig.maps.camp} />
        </section>
      </div>
      <Paper component="section" className={styles.collab} aria-label="collaboration">
        <Typography component="h2" variant="body2" align="center" color="primary.dark" gutterBottom>
          Ve spolupráci
        </Typography>
        <div className={styles.logos}>
          <Image
            src="/logo/casopis.png"
            width={1600}
            height={1500}
            alt="Časopis Tábor Oskar"
            sizes="100px"
            className={styles.logo}
          />
          <Image
            src="/logo/oskar30let.png"
            width={481}
            height={484}
            alt="Tábor Oskar 30 let"
            sizes="100px"
            className={styles.logo}
          />
        </div>
      </Paper>
    </main>
  );
}
