import { defineConfig } from 'prisma/config';
import { loadEnvConfig } from '@next/env';
import { postgresUrl } from './src/lib/utilities/postgres-url';

loadEnvConfig(process.cwd()); // hotfix for prisma.config.ts not loading .env automatically

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: postgresUrl(),
  },
});
