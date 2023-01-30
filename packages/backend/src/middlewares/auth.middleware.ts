import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import * as process from 'process';
import { RequestWithUser } from '../types/request.type';
import User from '../models/User';
import { RequestErrorUtil } from '../utils/request-error.util';

export const auth = async (req: RequestWithUser, _res: Response, next: NextFunction) => {
  const { authorization = '' } = req.headers;

  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer' || !token) {
    next(RequestErrorUtil(401, 'Not authorized'));
  }
  try {
    const jwtPayload = jwt.verify(token, process.env.SECRET_KEY);
    if (typeof jwtPayload !== 'string') {
      const user = await User.findOne({ _id: jwtPayload.id });
      if (!user || !user.token) {
        next(RequestErrorUtil(401, 'Not authorized2'));
      } else {
        req.user = user;
      }
    }

    next();
  } catch (error) {
    next(RequestErrorUtil(401, (error as Error).message));
  }
};
