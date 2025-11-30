import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";

import { db } from "../db/index.js";
import { users } from "../db/schemas.js";
import { env } from "../config/env.js";

export async function generateAndStoreJWT(userId: string, email: string): Promise<string> {
    const token = jwt.sign({ id: userId, email: email }, env.JWT_SECRET);

    await db.update(users).set({ jwt: token }).where(eq(users.id, userId));
    return token;
}