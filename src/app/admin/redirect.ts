import { Redirect } from 'next/dist/lib/load-custom-routes';

const redirect: Redirect = {
  source: '/admin',
  destination: '/api/v1/auth/connect/google',
  permanent: true,
};

export default redirect;
