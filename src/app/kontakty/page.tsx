import { Metadata } from 'next';
import routes from '../routes';

export const metadata: Metadata = {
  title: routes['/kontakty'].label,
};

export default function Contacts() {
  return <div>kontakty works!</div>;
}
