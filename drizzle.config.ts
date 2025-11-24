import { defineConfig } from 'drizzle-kit';

import { env } from "./src/config/env"

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schemas.ts',
  dialect: 'postgresql',
  dbCredentials: {
    user: env.POSTGRES_USERNAME,
    host: env.POSTGRES_HOST,
    database: env.POSTGRES_DATABASE,
    password: env.POSTGRES_PASSWORD,
    port: env.POSTGRES_PORT || 5432,
    ssl:false
  },
});
