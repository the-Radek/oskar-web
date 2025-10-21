import themedGameRedirect from './taborova-hra/redirect';
import themedGameMetadata from './taborova-hra/metadata.json';
import galleryMetadata from './galerie/metadata.json';
import forApplicantsMetadata from './pro-zajemce/metadata.json';
import aboutCampMetadata from './o-tabore/metadata.json';
import contactsMetadata from './kontakty/metadata.json';

export interface RouteInfo {
  label: string;
}

const routes: Record<string, RouteInfo> = {
  '/': { label: 'Úvodní stránka' },
  [themedGameRedirect.destination]: { label: themedGameMetadata.title },
  '/galerie': { label: galleryMetadata.title },
  '/pro-zajemce': { label: forApplicantsMetadata.title },
  '/o-tabore': { label: aboutCampMetadata.title },
  '/kontakty': { label: contactsMetadata.title },
};

export default routes;
