export interface RouteInfo {
  label: string;
}

const routes: Record<string, RouteInfo> = {
  '/': { label: 'Úvodní stránka' },
  '/taborova-hra': { label: 'Celotáborová hra' },
  '/turnusy': { label: 'Turnusy' },
  '/o-tabore': { label: 'O táboře' },
  '/galerie': { label: 'Galerie' },
  '/kontakty': { label: 'Kontakty' },
};

export default routes;
