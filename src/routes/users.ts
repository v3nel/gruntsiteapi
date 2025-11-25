import { Router, Request, Response } from "express";

import { db } from "../db/index.js";
import { users } from "../db/schemas.js";

const userRouter = Router();

userRouter.post("/login", (req: Request, res: Response) => {
    
});

userRouter.get("/", async (res: Response) => {
    const userTable = await db.select().from(users)
    return res.status(200).json(userTable)
});

userRouter.post("/",  (req: Request, res: Response) => {
    
});

userRouter.patch("/", (req: Request, res: Response) => {

});

export default userRouter;