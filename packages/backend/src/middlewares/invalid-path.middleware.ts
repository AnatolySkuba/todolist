import { Request, Response } from 'express';

export const invalidPathHandler = (_: Request, res: Response) => {
  res.status(400);
  res.send('invalid path');
};
