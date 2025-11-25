import { Router, Request, Response, NextFunction } from "express";

import { db } from "../db/index.js";
import { users } from "../db/schemas.js";
import { hashPassword } from "../auth/hash.js";

const userRouter = Router();

userRouter.post("/login", (req: Request, res: Response) => {
    
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
        const body = req.body;
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