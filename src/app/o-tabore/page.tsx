import { Metadata } from 'next';
import routes from '../routes';

export const metadata: Metadata = {
  title: routes['/o-tabore'].label,
};

export default function About() {
  return <div>o-tabore works!</div>;
}
