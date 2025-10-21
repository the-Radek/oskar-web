import config from './[year]/page.config.json';

const lastYear = Object.keys(config).reduce((a, b) => (a.localeCompare(b) >= 0 ? a : b));

const redirects = [
  {
    source: '/taborova-hra',
    destination: `/taborova-hra/${lastYear}`,
    permanent: false,
  },
];

export default redirects;
