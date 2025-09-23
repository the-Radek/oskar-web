import { Metadata } from 'next';
import routes from '../routes';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Image from 'next/image';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: routes['/o-tabore'].label,
};

export default function About() {
  return (
    <main>
      <section aria-label="Tábor Oskar" className={styles.oskar}>
        <Typography variant="h2">Tábor Oskar</Typography>
        <Typography align="justify">
          Letní tábor Oskar existuje více než 30 let. Každé léto nabízíme několik turnusů, na které
          jezdí desítky dětí. Náš program je všeobecně zaměřený. Připravujeme originální
          celotáborové hry (CTH), které jinde nenajdete. Tábor se nachází v Holubím Koutě, v
          malebném prostředí přírodního parku Kamínky u Rokycan. Od roku 2023 tábor pořádá spolek
          Přátel LDT Oskar ve spolupráci se zakladatelem tábora.
        </Typography>
      </section>
      <Paper className={styles.paper}>
        <section aria-label="area">
          <Image
            src="/icon/disco-ball.png"
            width={211}
            height={211}
            alt="Disko koule"
            sizes="100px"
            className={styles.icon}
          />
          <Typography variant="h3" color="inherit" gutterBottom={false}>
            Objekt
          </Typography>
          <Typography align="justify">
            Objekt leží v lese a sousedí s rybníkem. Mladší děti spí v chatkách s palandami, starší
            oddíly pak ve stanech s podsadami. Tábor je vybaven zděnými budovami se sociálním
            zařízením (sprchy a toalety), vlastní kuchyní a jídelnou. Dále se v objektu nachází
            hřiště, minigolf a ohniště pro velký táborák.
          </Typography>
        </section>
        <section aria-label="schedule">
          <Image
            src="/icon/night-tent.png"
            width={211}
            height={211}
            alt="Tábor"
            sizes="100px"
            className={styles.icon}
          />
          <Typography variant="h3" color="inherit" gutterBottom={false}>
            Táborový program
          </Typography>
          <Typography align="justify">
            O bohatý program se starají vedoucí a praktikanti. Každý den připravují hry a aktivity v
            lese, které se střídají s celotáborovou hrou. Po obědě a večeři mají děti možnost si
            zahrát nějaké deskové hry, minigolf, nabatikovat si triko nebo si vytvořit něco na
            památku.
          </Typography>
        </section>
        <section aria-label="food">
          <Image
            src="/icon/shop.png"
            width={211}
            height={211}
            alt="Jídelna"
            sizes="100px"
            className={styles.icon}
          />
          <Typography variant="h3" color="inherit" gutterBottom={false}>
            Stravování
          </Typography>
          <Typography align="justify">
            Veškeré jídlo je připravováno ve vlastní táborové kuchyni, a to pětkrát denně. Během
            tábora nechybí ani opékání špekáčků. Někdy si děti vyzkouší, jaké to je vařit v kotlíku
            na ohni.
          </Typography>
        </section>
        <section aria-label="day trip">
          <Image
            src="/icon/campfire.png"
            width={211}
            height={211}
            alt="Táborák"
            sizes="100px"
            className={styles.icon}
          />
          <Typography variant="h3" color="inherit" gutterBottom={false}>
            Celodenní výlet
          </Typography>
          <Typography align="justify">
            Jednou za tábor se vydáváme s batohy na celodenní výlet, který mnohdy zpestří přespávání
            v přírodě. Někdy je cílem město, místní památky či cesta vlakem. Doporučujeme děti
            vybavit drobným kapesným.
          </Typography>
        </section>
        <section aria-label="scout game">
          <Image
            src="/icon/Map.png"
            width={211}
            height={211}
            alt="Mapa"
            sizes="100px"
            className={styles.icon}
          />
          <Typography variant="h3" color="inherit" gutterBottom={false}>
            Bojovka a orientační běh
          </Typography>
          <Typography align="justify">
            V programu nechybí ani noční hry v lese či stezka odvahy. Náročnost je dána dle věku. To
            stejné platí o orientačním běhu, který prověřuje schopnost orientovat se v přírodě, v
            mapě a další vědomosti a dovednosti, které se děti během tábora naučí.
          </Typography>
        </section>
        <section aria-label="bathing">
          <Image
            src="/icon/signpost.png"
            width={211}
            height={211}
            alt="Rozcestník"
            sizes="100px"
            className={styles.icon}
          />
          <Typography variant="h3" color="inherit" gutterBottom={false}>
            Koupání v přírodě
          </Typography>
          <Typography align="justify">
            Pokud je horké počasí, některé oddíly se vyráží koupat do blízkých přírodních nádrží
            nebo přírodních koupališť. V rybníku u tábora koupání není možné.
          </Typography>
        </section>
      </Paper>
    </main>
  );
}
