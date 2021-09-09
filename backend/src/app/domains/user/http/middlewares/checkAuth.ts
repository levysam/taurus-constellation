import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../../../../../config/auth';
import CustomError from '../../../../errors/CustomError';

const checkAuth = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  const auth = request.headers.authorization;

  if (!auth) {
    throw new CustomError('Missing valid JWT token.', 401);
  }

  const [, token] = auth.split(' ');

  try {
    verify(token, authConfig.jwt.secret);

    return next();
  } catch {
    throw new CustomError('Invalid JWT token.', 401);
  }
};

export default checkAuth;
