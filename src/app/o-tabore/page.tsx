import { Metadata } from 'next';
import Typography from '@mui/material/Typography';
import styles from './page.module.css';
import * as assets from './page.assets';
import metadataJson from './metadata.json';
import Surface from '@/components/content/Surface';
import IconSection from '@/components/content/IconSection';

export const metadata: Metadata = metadataJson;

const sections = [
  {
    icon: assets.iconDiscoBall,
    alt: 'Disko koule',
    label: 'area',
    title: 'Objekt',
    text: 'Objekt leží v lese a sousedí s rybníkem. Mladší děti spí v chatkách s palandami, starší oddíly pak ve stanech s podsadami. Tábor je vybaven zděnými budovami se sociálním zařízením (sprchy a toalety), vlastní kuchyní a jídelnou. Dále se v objektu nachází hřiště, minigolf a ohniště pro velký táborák.',
  },
  {
    icon: assets.iconNightTent,
    alt: 'Tábor',
    label: 'schedule',
    title: 'Táborový program',
    text: 'O bohatý program se starají vedoucí a praktikanti. Každý den připravují hry a aktivity v lese, které se střídají s celotáborovou hrou. Po obědě a večeři mají děti možnost si zahrát nějaké deskové hry, minigolf, nabatikovat si triko nebo si vytvořit něco na památku.',
  },
  {
    icon: assets.iconShop,
    alt: 'Jídelna',
    label: 'food',
    title: 'Stravování',
    text: 'Veškeré jídlo je připravováno ve vlastní táborové kuchyni, a to pětkrát denně. Během tábora nechybí ani opékání špekáčků. Někdy si děti vyzkouší, jaké to je vařit v kotlíku na ohni.',
  },
  {
    icon: assets.iconCampfire,
    alt: 'Táborák',
    label: 'day trip',
    title: 'Celodenní výlet',
    text: 'Jednou za tábor se vydáváme s batohy na celodenní výlet, který mnohdy zpestří přespávání v přírodě. Někdy je cílem město, místní památky či cesta vlakem. Doporučujeme děti vybavit drobným kapesným.',
  },
  {
    icon: assets.iconMap,
    alt: 'Mapa',
    label: 'scout game',
    title: 'Bojovka a orientační běh',
    text: 'V programu nechybí ani noční hry v lese či stezka odvahy. Náročnost je dána dle věku. To stejné platí o orientačním běhu, který prověřuje schopnost orientovat se v přírodě, v mapě a další vědomosti a dovednosti, které se děti během tábora naučí.',
  },
  {
    icon: assets.iconSignpost,
    alt: 'Rozcestník',
    label: 'bathing',
    title: 'Koupání v přírodě',
    text: 'Pokud je horké počasí, některé oddíly se vyráží koupat do blízkých přírodních nádrží nebo přírodních koupališť. V rybníku u tábora koupání není možné.',
  },
];

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
        {sections.map(({ icon, alt, label, title, text }) => (
          <IconSection key={label} icon={icon} alt={alt} label={label} title={title}>
            {text}
          </IconSection>
        ))}
      </Surface>
    </main>
  );
}
