export interface RouteInfo {
  label: string;
}

const routes: Record<string, RouteInfo> = {
  '/': { label: 'Úvodní stránka' },
  '/taborova-hra': { label: 'Celotáborová hra' },
  '/galerie': { label: 'Galerie' },
  '/pro-zajemce': { label: 'Pro zájemce' },
  '/o-tabore': { label: 'O táboře' },
  '/kontakty': { label: 'Kontakty' },
};

export default routes;
