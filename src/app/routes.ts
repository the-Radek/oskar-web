export interface RouteInfo {
  label: string;
}

const routes: Record<string, RouteInfo> = {
  '/': { label: 'Úvodní stránka' },
  '/galerie': { label: 'Galerie' },
  '/taborova-hra': { label: 'Celotáborová hra' },
  '/pro-zajemce': { label: 'Pro zájemce' },
  '/o-tabore': { label: 'O táboře' },
  '/kontakty': { label: 'Kontakty' },
};

export default routes;
