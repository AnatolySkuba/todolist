import { Response, Request, NextFunction } from 'express';
import Joi from 'joi';
import { RequestErrorUtil } from '../utils/request-error.util';

export const validator = <T>(schema: Joi.ObjectSchema<T>) => {
  const func = (req: Request, _: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(RequestErrorUtil(400, error.message));
    }
    next();
  };

  return func;
};
