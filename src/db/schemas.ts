import { pgTable, text, timestamp, char, jsonb } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm"

export const users = pgTable("users", {
  id: char("id", { length: 24 })
    .default(sql`substr(encode(gen_random_bytes(12), 'hex'), 1, 24)`)
    .primaryKey(),
  email: text("email").notNull().unique(),
  hashed_password: text("hashed_password").notNull(),
  permissions: jsonb("permissions")
    .default(
      sql`'{
        "manage_podcasts": false, 
        "manage_posts": false, 
        "view_podcasts": false, 
        "view_posts": false,
        "manage_cyphers": false,
        "view_cyphers": false,
        "manage_users": false
      }'::jsonb`
    )
    .notNull(),
  created_at: timestamp("created_at").defaultNow()
});
