import { NextFunction, Router, Request, Response } from "express";

import { db } from "../db/index.js";
import { posts } from "../db/schemas.js";
import { eq } from "drizzle-orm";

const postRouter = Router();

postRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const q = await db.select().from(posts) // Arranger le schema afin de pouvoir les ordonner par date
        return res.status(200).json({data: q})
    } catch(err) {
        next(err);
    }
})

postRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const post = await db.select().from(posts).where(eq(posts.id, id));

        return res.status(200).json({data: post});
    } catch(err) {
        next(err)
    }
})