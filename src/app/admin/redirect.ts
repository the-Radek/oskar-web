import { Redirect } from 'next/dist/lib/load-custom-routes';
import API_PATH from '../api/api-path';

const redirect: Redirect = {
  source: '/admin',
  destination: `${API_PATH}auth/connect/google`,
  permanent: true,
};

export default redirect;
