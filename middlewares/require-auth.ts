import { NextFunction, Request, Response } from 'express';
import { services } from '../server';
import { AuthenticationError } from '../utils/authentication-error';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth = services.token.getAuth({ req, next });
    if (!auth) {
      throw new AuthenticationError('Authorization is required');
    }
    next();
  } catch (error) {
    next(error);
  }
};
