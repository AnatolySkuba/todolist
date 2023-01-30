import { Response, NextFunction } from 'express';
import { RequestWithUser } from '../types/request.type';

export const tryCatchWrapper = (ctrl: any) => {
  const func = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const response = await ctrl(req, res, next);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message || 'Something went wrong!' });
    }
  };

  return func;
};
