import { Metadata } from 'next';
import routes from '../routes';

export const metadata: Metadata = {
  title: routes['/taborova-hra'].label,
};

export default function ThemedGame() {
  return <div>taborova-hra works!</div>;
}
