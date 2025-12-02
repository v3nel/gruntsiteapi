import { Router } from 'express';

import healthRouter from './health.js';

const router = Router();

/**
 * @openapi
 * /:
 *  get:
 *    summary: First
 *    description: "Gives informations about the api version"
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  example: "gruntsiteapi"
 *                version:
 *                  type: string
 *                  example: "0.1.0"
 */
router.get('/', (_req, res) => {
  res.json({ name: 'gruntsiteapi', version: '0.1.0' });
});

router.use('/health', healthRouter);

export default router;