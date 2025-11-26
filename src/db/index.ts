import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

import { env } from '../config/env.js';

const pool = new Pool({ 
    user: env.POSTGRES_USERNAME,
	host: env.POSTGRES_HOST,
	database: env.POSTGRES_DATABASE,
	password: env.POSTGRES_PASSWORD,
	port: env.POSTGRES_PORT || 5432,
 });

export const db = drizzle(pool);