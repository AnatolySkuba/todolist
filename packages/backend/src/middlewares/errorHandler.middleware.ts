import { Request, Response } from 'express';

interface Error {
  statusCode?: number;
  message: string;
}

export function errorHandler(err: Error, _: Request, res: Response) {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || 'Something went wrong';
  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg
  });
}
