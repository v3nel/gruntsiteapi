import { Router } from 'express';
import healthRouter from './health.js';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ name: 'gruntsiteapi', version: '0.1.0' });
});

router.use('/health', healthRouter);

export default router;
