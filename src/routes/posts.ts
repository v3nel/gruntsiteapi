import { NextFunction, Router, Request, Response } from "express";

import { db } from "../db/index.js";
import { posts } from "../db/schemas.js";

const postRouter = Router();

postRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
    try {
        const q = db.select().from(posts) // Arranger le schema afin de pouvoir les ordonner par date
        return res.status(200).json({data: q})
    } catch(err) {
        next(err);
    }
})