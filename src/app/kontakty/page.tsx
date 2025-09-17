import { Metadata } from 'next';
import routes from '../routes';
import Typography from '@mui/material/Typography';
import theme from '@/theme/static';
import Box from '@mui/material/Box';
import DefinitionList from '@/components/layout/DefinitionList';
import DefinitionListItem from '@/components/layout/DefinitionListItem';
import Phone from '@/components/data/Phone';
import Email from '@/components/data/Email';

export const metadata: Metadata = {
  title: routes['/kontakty'].label,
};

export default function Contacts() {
  return (
    <main>
      <section aria-label="post address">
        <Typography component="h2" variant="h2">
          Adresa pro dopisy
        </Typography>
        <address>
          Tábor Oskar – Holubí kout
          <br />
          jméno dítěte (doplňte číslo oddílu, které se dozvíte při odjezdu)
          <br />
          337 01 Veselá
          <br />
        </address>
      </section>
      <section aria-label="contact details">
        <Typography component="h2" variant="h2">
          Kontakt
        </Typography>
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
        <Typography component="h2" variant="h2">
          Telefon na tábor
        </Typography>
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
        <Typography component="h2" variant="h2">
          Organizátor
        </Typography>
        <Box component="p" sx={{ fontWeight: theme.typography.fontWeightMedium }}>
          Přátelé LDT Oskar, z. s.
        </Box>
        <DefinitionList>
          <DefinitionListItem label="předseda">Anna Puklová</DefinitionListItem>
          <DefinitionListItem label="kontakt">
            <Phone>732 350 322</Phone> / <Email>spolek.oskar@gmail.com</Email>
          </DefinitionListItem>
        </DefinitionList>
      </section>
    </main>
  );
}
