import { eq } from "drizzle-orm";
import { db } from "../db/index.js";

import { users } from "../db/schemas.js";

export async function usersExists(email: string): Promise<boolean> {
    const user = await db.select().from(users).where(eq(users.email, email))
    return user.length > 0
};