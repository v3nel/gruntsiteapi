import { Router, Request, Response, NextFunction } from "express";
import { eq } from "drizzle-orm";

import { db } from "../db/index.js";
import { users } from "../db/schemas.js";
import { hashPassword } from "../auth/hash.js";

import { loginSchema } from "../schemas/loginSchema.js";
import { createUserSchema } from "../schemas/createUserSchema.js";
import { usersExists } from "../auth/exists.js";
import { generateAndStoreJWT } from "../auth/genstorejwt.js";
import { verifyHash } from "../auth/verify.js";

const userRouter = Router();

userRouter.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = loginSchema.parse(req.body);
        const exists = await usersExists(email);
        
        if (!exists) {
            return res.status(401).json({ error: "This email/password combinaison does not exist"});
        };

        const userq = await db.select().from(users).where(eq(users.email, email)).limit(1);
        const user = userq[0];

        const isValid = verifyHash(user.hashed_password, password)

        if (!isValid) {
            return res.status(401).json({error: "This email/password combinaison does not exist"})
        }

        if (!user.jwt) {
            const token = await generateAndStoreJWT(user.id, user.email);
            return res.status(200).json({ message: "Successfully logged in", email: user.email, jwt: token})
        }

        return res.status(200).json({ message: "Successfully logged in", email: user.email, jwt: user.jwt})
    } catch(err) {
        next(err)
    }
});

userRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userTable = await db.select().from(users);
        return res.status(200).json(userTable);
    } catch (error) {
        next(error);
    }
});

userRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = createUserSchema.parse(req.body);
        
        const existingUser = await db.select().from(users).where(eq(users.email, body.email)).limit(1);
        if (existingUser.length > 0) {
            return res.status(409).json({ error: "User with this email already exists" });
        }
        
        const hash = await hashPassword(body.password);
        await db.insert(users).values([
            {
                email: body.email,
                hashed_password: hash,
                permissions: body.permissions
            }
        ]);
        return res.status(201).json({
            response: "User created with the next informations",
            email: body.email,
            permissions: body.permissions
        })
    } catch(err) {
        next(err)
    }
});

userRouter.patch("/", (req: Request, res: Response) => {

});

export default userRouter;