import { Metadata } from 'next';
import Typography from '@mui/material/Typography';
import metadataJson from './metadata.json';
import Surface from '@/components/content/Surface';

export const metadata: Metadata = metadataJson;

export default function ThemedGameLayout({ children }: LayoutProps<'/taborova-hra'>) {
  return (
    <main>
      {children}
      <Surface>
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
      </Surface>
    </main>
  );
}
