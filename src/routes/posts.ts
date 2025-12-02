import { NextFunction, Router, Request, Response } from "express";

import { db } from "../db/index.js";
import { posts } from "../db/schemas.js";

const postRouter = Router();

/**
 * @openapi
 * /posts:
 *  get:
 *      summary: Get Posts
 *      description: Retreive all the posts if you are allowed to
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  id:
 *                                      type: string
 *                                      example: 2
 *                                  type:
 *                                      type: string
 *                                      enum: ["vertical","video","photo"]
 *                                      example: "vertical"
 *                                  platforms:
 *                                      type: array
 *                                      items:
 *                                          type: string
 *                                      example: ["youtube", "tikok", "instagram"]
 *                                  mediaurl:
 *                                      type: string
 *                                      example: "https://example.com/v/1d23e6z9"
 *                                           
 */
postRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
    try {
        const q = db.select().from(posts) // Arranger le schema afin de pouvoir les ordonner par date
        return res.status(200).json({data: q})
    } catch(err) {
        next(err);
    }
})