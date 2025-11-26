import { Router, Request, Response } from "express";

const publicRouter = Router();

publicRouter.get("/media/:id", async (req: Request, res: Response) => {
    
});

export default publicRouter;