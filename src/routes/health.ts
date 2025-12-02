import { Router } from 'express';

const router = Router();

/**
 * @openapi
 * /health:
 *  get:
 *    summary: Health
 *    description: Sends informations about the process time and the status
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: "ok"
 *                uptime:
 *                  type: float
 *                  example: 52.726634272
 *                timestamp:
 *                  type: int
 *                  example: 1764677909362
 */
router.get('/', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), timestamp: Date.now() });
});

export default router;
