import { Metadata } from 'next';
import routes from '../routes';

export const metadata: Metadata = {
  title: routes['/galerie'].label,
};

export default function Gallery() {
  return <div>galerie works!</div>;
}
