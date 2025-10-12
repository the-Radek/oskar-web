import { Metadata } from 'next';
import Image from 'next/image';
import Paper from '@mui/material/Paper';
import routes from '../routes';
import styles from './page.module.css';
import config from './page.config.json';
import Typography from '@mui/material/Typography';

export const metadata: Metadata = {
  title: routes['/taborova-hra'].label,
};

export default function ThemedGame() {
  const { alt, ...imgProps } = config['2025'].image;

  return (
    <main>
      <section className={styles.game}>
        <Image alt={alt} {...imgProps} sizes="300px" className={styles.img} />
        <Typography variant="h2">{config['2025'].title}</Typography>
        <Typography align="justify">{config['2025'].description}</Typography>
      </section>
      <Paper className={styles.paper}>
        <Typography align="justify">
          Celotáborová hra (CTH) je hlavním programem našeho tábora a skládá se z několika etap.
          Děti jsou rozděleny do skupin napříč věkem. Jednotlivé etapy mohou být komplexní hry na
          celé odpoledne, delší orientační běhy či drobné dílčí úkoly, které mají prokázat sehranost
          a spolupráci v týmu. Obtížnost her se vždy přizpůsobí všem věkovým kategoriím. Táborníci
          se při CTH setkají s různými šiframi, hádankami, logickými úkoly, ale také mnohdy budou
          muset prokázat fyzickou zdatnost a rychlost. Příběh CTH každý rok měníme a rozdíly najdete
          i napříč turnusy. Můžete se těšit na rozmanité kostýmy, hrané scénky, tematické večery a
          jiné zážitky.
        </Typography>
      </Paper>
    </main>
  );
}
