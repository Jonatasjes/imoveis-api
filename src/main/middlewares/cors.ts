import { Request, Response, NextFunction } from 'express';

export const cors = (req: Request, res: Response, next: NextFunction): void => {
  res.set('access-control-allow-origin', '*');
  res.set('access-control-allow-methods', ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE']);
  res.set('access-control-allow-headers', '*');
  next();
};
