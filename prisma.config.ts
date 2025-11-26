import { defineConfig } from 'prisma/config';
import dotenv from 'dotenv';
import { postgresUrl } from './src/lib/utilities/postgres-url';

dotenv.config({ path: '.env' }); // hotfix for prisma.config.ts not loading .env automatically

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: postgresUrl(true),
  },
});
