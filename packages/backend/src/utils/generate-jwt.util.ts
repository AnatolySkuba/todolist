import jwt from 'jsonwebtoken';
import * as process from 'process';

export const generateJwt = (payload: string | object | Buffer) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION
  });

  return {
    token
  };
};
