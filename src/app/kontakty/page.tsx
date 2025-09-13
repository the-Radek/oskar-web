import { Metadata } from 'next';
import routes from '../routes';
import Typography from '@mui/material/Typography';
import DefinitionList from '@/components/widgets/layout/definition-list';
import DefinitionListItem from '@/components/widgets/layout/definition-list-item';

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
          <span>Tábor Oskar – Holubí kout</span>
          <span>
            <i>jméno dítěte (doplňte číslo oddílu, které se dozvíte při odjezdu)</i>
          </span>
          <span>337 01 Veselá</span>
        </address>
      </section>
      <section aria-label="contact details">
        <Typography component="h2" variant="h2">
          Kontakt
        </Typography>
        <DefinitionList>
          <DefinitionListItem label="Telefon na tábor">
            <a href="tel:+420602829892">602 829 892</a>
          </DefinitionListItem>
          <DefinitionListItem label="E-mail">
            <a href="mailto:info@taboroskar.cz">spolek.oskar@gmail.com</a>
          </DefinitionListItem>
        </DefinitionList>
      </section>
    </main>
  );
}
