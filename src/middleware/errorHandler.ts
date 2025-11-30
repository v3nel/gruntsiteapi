import type { NextFunction, Request, Response } from 'express';

export function notFound(_req: Request, res: Response, _next: NextFunction) {
  res.status(404).json({ error: 'Not Found' });
}

 
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  const message = err instanceof Error ? err.message : 'Internal Server Error';
  const status = err instanceof Error && (err as any).status ? (err as any).status : 500;
  res.status(status).json({ error: message });
}
