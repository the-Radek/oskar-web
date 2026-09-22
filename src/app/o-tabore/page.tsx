import { Metadata } from 'next';
import Typography from '@mui/material/Typography';
import styles from './page.module.css';
import * as assets from './page.assets';
import metadataJson from './metadata.json';
import config from './page.config.json';
import Surface from '@/components/content/Surface';
import IconSection from '@/components/content/IconSection';

export const metadata: Metadata = metadataJson;

export default function About() {
  return (
    <main>
      <Surface variant="container" aria-label="Tábor Oskar">
        <Typography variant="h2">Tábor Oskar</Typography>
        <Typography align="justify">
          Letní tábor Oskar existuje více než 30 let. Každé léto nabízíme několik turnusů, na které
          jezdí desítky dětí. Náš program je všeobecně zaměřený. Připravujeme originální
          celotáborové hry (CTH), které jinde nenajdete. Tábor se nachází v Holubím Koutě, v
          malebném prostředí přírodního parku Kamínky u Rokycan. Od roku 2023 tábor pořádá spolek
          Přátel LDT Oskar ve spolupráci se zakladatelem tábora.
        </Typography>
      </Surface>
      <Surface className={styles.paper}>
        {config.sections.map(({ icon, alt, label, title, text }) => (
          <IconSection
            key={label}
            icon={assets[icon as keyof typeof assets]}
            alt={alt}
            label={label}
            title={title}
          >
            {text}
          </IconSection>
        ))}
      </Surface>
    </main>
  );
}
