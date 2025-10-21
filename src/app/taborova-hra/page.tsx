import { redirect } from 'next/navigation';
import config from './[year]/page.config.json';

export default function ThemedGame() {
  const lastYear = Object.keys(config).reduce((a, b) => (a.localeCompare(b) >= 0 ? a : b));
  redirect(`/taborova-hra/${lastYear}`);
}
