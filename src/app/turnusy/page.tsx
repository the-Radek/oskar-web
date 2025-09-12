import { Metadata } from 'next';
import routes from '../routes';

export const metadata: Metadata = {
  title: routes['/turnusy'].label,
};

export default function Turns() {
  return <div>turnusy works!</div>;
}
