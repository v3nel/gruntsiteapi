import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { db } from "../db/index.js";
import { users } from "../db/schemas.js";
import { eq } from "drizzle-orm";
import { env } from "../config/env.js";

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export async function authJWT(req: Request, res:Response, next:NextFunction) {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({error:"Unauthorized use of the API"});
    }

    const token = header.split(" ")[1];

    try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string; email: string };

        const user = await db.select().from(users).where(eq(users.id, decoded.id)).limit(1);

        if (user.length === 0 || user[0].jwt !== token) {
            return res.status(401).json({ error: "The token is invalid"});
        };

        req.user = user[0];
        next();
    } catch(err) {
        return res.status(401).json({ error: "There was an error while validating the token"});
    };
}