import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.string().default('4000'),
  CORS_ORIGIN: z.string().default('*'),
  POSTGRES_USERNAME: z.string(),
  POSTGRES_HOST: z.string(),
  POSTGRES_DATABASE: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_PORT: z.number().optional(),
  JWT_SECRET: z.string(),
});

export const env = EnvSchema.parse(process.env);
