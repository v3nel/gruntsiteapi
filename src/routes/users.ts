import { Router, Request, Response } from "express";

import { db } from "../db/index.js";
import { users } from "../db/schemas.js";

const userRouter = Router();

userRouter.post("/login", (req: Request, res: Response) => {
    
});

userRouter.get("/", async (req: Request, res: Response, next) => {
    try {
        const userTable = await db.select().from(users);
        return res.status(200).json(userTable);
    } catch (error) {
        next(error);
    }
});

userRouter.post("/",  (req: Request, res: Response) => {
    
});

userRouter.patch("/", (req: Request, res: Response) => {

});

export default userRouter;