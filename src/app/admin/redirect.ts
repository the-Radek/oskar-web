import type { Redirect } from 'next/dist/lib/load-custom-routes';

const redirect: Redirect = {
  source: '/admin',
  destination: '/api/auth/signin/google',
  permanent: true,
};

export default redirect;
