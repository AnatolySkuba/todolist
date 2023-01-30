import { Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';
import { RequestWithUser } from '../types/request.type';
import { RequestErrorUtil } from '../utils/request-error.util';

// middleware to handle if the todo's id exists
export const isExist = (req: RequestWithUser, _: Response, next: NextFunction) => {
  const { id } = req.params;
  const isCorrectId = isValidObjectId(id);
  if (!isCorrectId) {
    const error = RequestErrorUtil(400, `${id} is not correct id format`);
    next(error);
  }
  next();
};
